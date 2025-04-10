const express = require("express");
const { InfoController } = require("../../controllers");
const router = express.Router();
const airplaneRoutes = require("./airplane-routes");
const cityRoutes = require("./city-routes");
const airportRoutes = require("./airport-routes");
const flightRoutes = require("./flight-routes");

router.use("/airplanes", airplaneRoutes);
router.use("/airports", airportRoutes);
router.use("/cities", cityRoutes);
router.use("/flights", flightRoutes);

router.get("/info", InfoController.info);

module.exports = router;
