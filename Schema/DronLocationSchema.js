const mongoose = require("mongoose");

const d = new Date();

const dronLocationSchema = new mongoose.Schema({
	dronId: { type: String, required: true },
	dronCurrentLocation: { type: String, required: true },
	createdAt: {
		type: String,
		default: d.toLocaleString(),
	},
	updatedAt: {
		type: String,
		default: d.toLocaleString(),
	},
});

const DronLocation = mongoose.model("dronLocation", dronLocationSchema);

module.exports = DronLocation;
