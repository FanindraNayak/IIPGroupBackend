const mongoose = require("mongoose");

const d = new Date();

const dronOnOrOfSchema = new mongoose.Schema({
	dronId: { type: String, required: true },
	dronOnOrOf: { type: Boolean, required: true, default: false },
	createdAt: {
		type: String,
		default: d.toLocaleString(),
	},
	updatedAt: {
		type: String,
		default: d.toLocaleString(),
	},
});

const DronOnOrOf = mongoose.model("dronOnOrOf", dronOnOrOfSchema);

module.exports = DronOnOrOf;
