const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { compareTime } = require("../utils/helpers/datetime-helpers");

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

module.exports = {
  createFlight,
};
