const express = require("express");

const router = express.Router();

const { UserToken } = require("../MiddleWare/MiddleWare");

const {
	reqisterUser,
	loginUser,
	findOneUser,
	logout,
	getAllUser,
} = require("../Controllers/UserControllers");

router.get("/", UserToken, getAllUser);

router.post("/register", reqisterUser);

router.post("/login", loginUser);

router.get("/logout", UserToken, logout);

router.get("/findOneUser/:id", UserToken, findOneUser);

module.exports = router;
