const express = require("express");

const router = express.Router();

const {
	addDronLocation,
	getDronLocation,
} = require("../Controllers/DroneLocationControllers");

router.post("/addOneDronLocation", addDronLocation);

router.get("/getTheCurrentDronLocation/:id", getDronLocation);

module.exports = router;
