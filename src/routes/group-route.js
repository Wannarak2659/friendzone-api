const express = require("express");

const upload = require("../middlewares/upload");
const groupController = require("../controllers/group-controller");

const router = express.Router();

router.post("/", upload.single("groupImage"), groupController.createGroup);

router.get("/:groupId", groupController.getGroupById);

router.get("/", groupController.getAllGroup);

router.patch(
  "/:groupId",
  upload.single("groupImage"),
  groupController.editGroup
);

module.exports = router;
