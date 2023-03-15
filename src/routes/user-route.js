const express = require("express");
const userController = require("../controllers/user-controller");

const upload = require("../middlewares/upload");

const router = express.Router();

router.patch(
  "/",
  upload.fields([
    { name: "firstName" },
    { name: "lastName" },
    { name: "email" },
    { name: "profileImage" },
  ]),
  userController.updateProfile
);

module.exports = router;
