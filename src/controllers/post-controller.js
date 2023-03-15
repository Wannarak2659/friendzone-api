const fs = require("fs");
const { Post, User } = require("../models");
const { validateCreatePost } = require("../validators/post-validator");

exports.createPost = async (req, res, next) => {
  try {
    const value = validateCreatePost({
      groupId: req.body.groupId,
      title: req.body.title,
    });

    value.userId = req.user.id; // #userId in post

    //#insert data to db
    const createdPost = await Post.create(value);
    const post = await Post.findOne({
      where: {
        id: +createdPost.id,
      },
      include: {
        model: User,
      },
    });

    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

exports.getAllPost = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      where: { groupId: req.params.groupId },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,

          attributes: {
            exclude: ["password"],
          },
        },
      ],
    });

    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

exports.editPost = async (req, res, next) => {
  try {
    const value = req.body;
    console.log("the value sent is: ", req.body);
    console.log("The post id is : ", req.params);
    const checkPost = await Post.findOne({ where: { id: +req.params.postId } });
    // const newPost = await Post.findOne({
    //   where: { id: req.params },
    // });

    if (!checkPost) {
      console.log("The post id does not exist");
    }
    const newPost = await Post.update(value, {
      where: { id: +req.params.postId, userId: req.user.id },
      // userId: req.user.id = only this id allowed to edit this post
    });
    res.status(200).json({ message: "Sucessful edit post", checkPost });
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  const { postId } = req.params;

  try {
    await Post.destroy({ where: { id: postId, userId: req.user.id } });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
