const express = require("express");
const { CityController } = require("../../controllers");
const { AirplaneMiddleware } = require("../../middlewares");
const router = express.Router();

// /api/v1/cities POST
router.post("/", CityController.createCity);

module.exports = router;
