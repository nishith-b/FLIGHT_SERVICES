const express = require("express");
const { InfoController } = require("../../controllers");
const router = express.Router();
const airplaneRoutes = require("./airplane-routes");
const cityRoutes = require("./city-routes");

router.use("/airplanes", airplaneRoutes);

router.get("/info", InfoController.info);

router.use("/cities", cityRoutes);

module.exports = router;
