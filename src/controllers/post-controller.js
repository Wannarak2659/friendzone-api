const fs = require("fs");
const { Post } = require("../models");
const { validateCreatePost } = require("../validators/post-validator");

exports.createPost = async (req, res, next) => {
  try {
    const value = validateCreatePost({
      groupId: req.body.groupId,
      title: req.body.title,
    });

    value.userId = req.user.id;

    //#insert data to db
    const post = await Post.create(value);
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

exports.getAllPost = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      where: { groupId: req.params.groupId },
    });

    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  const { postId } = req.params;

  try {
    // const post = await Post.findOne({
    //   where: { groupId: postId },
    // });
    // if (!post) {
    //   createError("this post was not found", 400);
    // }
    // if (post.userId !== req.user.id) {
    //   createError("You are unauthorized", 403);
    // }
    await Post.destroy({ where: { id: postId } });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
