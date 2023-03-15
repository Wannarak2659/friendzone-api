// ### con with post-controller

const express = require("express");
const upload = require("../middlewares/upload");

const postController = require("../controllers/post-controller");
// const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/", postController.createPost);

router.get("/:groupId", postController.getAllPost);

router.patch(
  "/:postId",
  upload.fields([{ name: "postId" }, { name: "newText" }]),
  postController.editPost
); //???

router.delete("/:postId", postController.deletePost);

module.exports = router;
