const { response } = require("express");
const { AirplaneService } = require("../services");
const StatusCodes = require("http-status-codes");
const { error } = require("winston");

/**
 * POST : /airplanes
 * req-body {modelNumber:'airbus320',capacity:300}
 */

async function createAirplane(req, res) {
  try {
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Successfully created an airplane",
      data: airplane,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: true,
      message: "Something went wrong while creating airplane",
      data: response,
      error: error,
    });
  }
}

module.exports = {
  createAirplane,
};
