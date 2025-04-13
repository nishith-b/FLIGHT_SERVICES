const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { compareTime } = require("../utils/helpers/datetime-helpers");
const { Op } = require("sequelize");

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    if (!compareTime(data.arrivalTime, data.departureTime)) {
      throw new AppError(
        "Arrival time cannot be less than or equal to departure time",
        StatusCodes.BAD_REQUEST
      );
    }

    const flight = await flightRepository.create(data);

    return flight;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const explanation = error.errors.map((err) => err.message);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      "Cannot create a new Flight Object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllFlights(query) {
  let customFilter = {};
  let sortFilter = {};
  // trips= MUM-DEL
  if (query.trips) {
    const [departureAirportId, arrivalAirportId] = query.trips.split("-");
    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;
  }

  if (query.price) {
    const [minPrice, maxPrice] = query.price.split("-");
    customFilter.price = {
      [Op.between]: [minPrice, maxPrice == undefined ? 2000 : maxPrice],
    };
  }

  if (query.travellers) {
    customFilter.totalSeats = {
      [Op.gte]: query.travellers,
    };
  }

  if (query.tripDate) {
    const startOfDay = new Date(query.tripDate);
    const endOfDay = new Date(query.tripDate);
    endOfDay.setHours(23, 59, 59, 999);

    customFilter.departureTime = {
      [Op.between]: [startOfDay, endOfDay],
    };
  }

  if (query.sort) {
    const params = query.sort.split(",");
    const sortFilters = params.map((param) => {
      return param.split("_");
    });
    sortFilter = sortFilters;
  }

  try {
    const flights = await flightRepository.getAllFlights(
      customFilter,
      sortFilter
    );
    return flights;
  } catch (error) {
    throw new AppError(
      "Cannot get data of all the flights",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createFlight,
  getAllFlights,
};
