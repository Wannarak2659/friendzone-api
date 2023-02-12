const express = require("express");
const userController = require("../controllers/user-controller");

const upload = require("../middlewares/upload");

const router = express.Router();

router.patch(
  "/",
  upload.fields(
    // ([{ name: "profileImage" }]),
    [{ name: "profileImage" }, { name: "CoverImage" }]
  ),
  userController.updateProfileImage
);

module.exports = router;
