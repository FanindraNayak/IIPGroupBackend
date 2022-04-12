const express = require("express");

const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

// Database we are using

require("./DB/Connection");

// Global routes

app.get("/", (req, res) => {
	res.send({ message: "Sent something" });
});

// Routes

app.use("/user", require("./Routes/UserRoutes"));

app.use("/dron", require("./Routes/DronLocationRoutes"));

app.use("/dronOnOff", require("./Routes/CheckDronOnOrOfRoutes"));

// PORT

const PORT = 8000;

app.listen(PORT, () => {
	console.log("Listining at port ", PORT);
});
