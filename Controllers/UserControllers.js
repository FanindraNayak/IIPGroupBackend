const User = require("../Schema/UserSchema.js");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Check the validity of the password and confirm password
module.exports.reqisterUser = async (req, res) => {
	try {
		const { name, email, password, cPassword } = req.body;

		const hassedPassword = await bcrypt.hash(password, 10);
		const hassedConfirmPassword = await bcrypt.hash(cPassword, 10);
		const data = new User({
			name,
			email,
			password: hassedPassword,
			cPassword: hassedConfirmPassword,
		});
		// console.log(data);

		const checkEmailIfExist = await User.find({ email: email });
		// console.log(checkEmailIfExist);

		if (checkEmailIfExist.length === 0) {
			await data.save();
			res.status(200).send({ message: "User Created" });
		} else res.status(400).send({ message: "User Already exist" });

		// res.send({ message: "Something" });
	} catch (error) {
		res.status(500).send(error);
	}
};

module.exports.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password || password.length < 2)
			res.status(400).send({ message: "Check All the entries" });
		else {
			const data = await User.findOne({ email: email });
			if (data !== null) {
				const UserIdFromMongo = data._id.toString();

				const checkUserLogin = await bcrypt.compare(password, data.password);
				if (checkUserLogin) {
					const jsonWebToken = jwt.sign(
						{
							name: data.name,
							droneId: UserIdFromMongo,
							email: data.email,
						},
						"secretPassword",
						{ expiresIn: "5hr" }
					);
					res.cookie("user", jsonWebToken, {
						maxAge: 2 * 60 * 60 * 1000,
						httpOnly: true,
						secure: false,
					});
					res.status(200).send({ message: "Logged In" });
				} else res.status(400).send({ message: "Error" });
			} else res.status(400).send({ message: "Error" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

// Finding one email

module.exports.findOneUser = async (req, res) => {
	try {
		const data = await User.findOne(
			{ _id: req.params.id },
			{ name: 1, email: 1, createdAt: 1, updatedAt: 1 }
		);
		res.status(200).send({ message: data });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Error", data: error });
	}
};

// Logout function

module.exports.logout = async (req, res) => {
	try {
		res.clearCookie("user");
		res.status(200).send({ message: "LoggedOut" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Error", data: error });
	}
};

// Get All User or Drone

module.exports.getAllUser = async (req, res) => {
	try {
		const data = await User.find(
			{},
			{ name: 1, email: 1, createdAt: 1, updatedAt: 1 }
		);
		console.log(data);
		res.status(200).send({ message: "Something", data: data });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Error", data: error });
	}
};
