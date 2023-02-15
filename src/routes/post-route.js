// ### con with post-controller

const express = require("express");

const postController = require("../controllers/post-controller");
// const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/", postController.createPost);

router.get("/:groupId", postController.getAllPost);

router.delete("/:postId", postController.deletePost);

module.exports = router;
