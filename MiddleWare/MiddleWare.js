const jwt = require("jsonwebtoken");

const UserToken = async (req, res, next) => {
	let token = req.cookies.user;
	if (token) {
		jwt.verify(token, "secretPassword", (error, decode) => {
			if (error) {
				console.log(error);
				res.status(400).send({ message: "Invalid Token" });
			} else {
				req.name = decode.name;
				req.email = decode.email;
				req.droneId = decode.droneId;
				next();
			}
		});
	} else res.status(400).send({ message: "Acess Denide" });
};

module.exports = { UserToken };
