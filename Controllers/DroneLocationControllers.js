const DronLocation = require("../Schema/DronLocationSchema");

module.exports.addDronLocation = async (req, res) => {
	try {
		const { dronId, dronCurrentLocation } = req.body;
		if (!dronCurrentLocation)
			res.status(200).send({ message: "No CurrentLocation Provided" });
		else {
			const data = new DronLocation({
				dronId,
				dronCurrentLocation,
			});
			await data.save();
			res.status(200).send({ message: "Location Added" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

module.exports.getDronLocation = async (req, res) => {
	try {
		const data = await DronLocation.find({ dronId: req.params.id });
		console.log(data);
		res.status(200).send({ message: "something", data: data });
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};
