const DronOnOrOf = require("../Schema/CheckDronOnOrOfSchema");

module.exports.addDronOnOrOf = async (req, res) => {
	try {
		const { dronId, dronOnOrOf } = req.body;

		const data = new DronOnOrOf({
			dronId,
			dronOnOrOf: dronOnOrOf,
		});

		const checkIfAlreadyExist = await DronOnOrOf.find({ dronId: dronId });
		if (checkIfAlreadyExist.length === 0) {
			await data.save();
			res.status(200).send({ message: "OnOf Created" });
		} else {
			await DronOnOrOf.findOneAndUpdate(
				{ dronId: dronId },
				{ dronOnOrOf: dronOnOrOf }
			);
			res.status(400).send({ message: "Dron On or Of Updated" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};
