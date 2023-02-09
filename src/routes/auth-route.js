const express = require("express");

const authController = require("../controllers/auth-controller");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/register", authController.register);
// router register will run at authController.register
router.post("/login", authController.login);
router.get("/user", authenticate, authController.getUser);
// # sent getUser to authController

module.exports = router;
