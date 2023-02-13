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
