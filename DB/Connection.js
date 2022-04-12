const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/IIPBackend";

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connection is sucessful"))
	.catch((error) => console.log(error));
