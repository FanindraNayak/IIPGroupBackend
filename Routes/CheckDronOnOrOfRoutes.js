const express = require("express");

const router = express.Router();

const { addDronOnOrOf } = require("../Controllers/CheckDronOnOrOfControllers");

router.post("/addDronOnOrOf", addDronOnOrOf);

module.exports = router;
