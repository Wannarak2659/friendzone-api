const express = require("express");

const upload = require("../middlewares/upload");
const groupController = require("../controllers/group-controller");

const router = express.Router();

router.post("/", upload.single("groupImage"), groupController.createGroup);

module.exports = router;
