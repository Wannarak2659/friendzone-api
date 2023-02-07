const express = require("express");

const authController = require("../controller/auth-controller");

const router = express.Router();

router.post("/register", authController.register);
// router register will run at authController.register

module.exports = router;
