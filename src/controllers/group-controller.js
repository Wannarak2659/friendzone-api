const fs = require("fs");
const { validateCreateGroup } = require("../validators/group-validator");
const { GroupPage } = require("../models");
const cloudinary = require("../utils/cloudinary");

exports.createGroup = async (req, res, next) => {
  try {
    const value = validateCreateGroup({
      name: req.body.name,
      detail: req.body.detail,
      groupImage: req.file?.path,
    });

    if (value.groupImage) {
      value.groupImage = await cloudinary.upload(value.groupImage);
    }

    value.userId = req.user.id;

    // #insert data to dbbase
    const group = await GroupPage.create(value);
    res.status(201).json({ value });
  } catch (err) {
    next(err);
  } finally {
    //#delete photo from cloud
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.getAllGroup = async (req, res, next) => {
  try {
    const groups = await GroupPage.findAll();

    res.status(200).json(groups);
  } catch (err) {
    next(err);
  }
};

exports.editGroup = async (req, res, next) => {
  try {
    let gImage;
    if (req.file) {
      // console.log("The image file is: ", req.file.originalname);
      gImage = await cloudinary.upload(req.file.path);
    }

    const { groupId } = req.params;
    const { name, detail, groupImage } = req.body;
    const value = { name, detail, groupImage: gImage };

    const updateGroup = await GroupPage.update(value, {
      where: { id: +req.params.groupId },
    });

    res
      .status(200)
      .json({ message: "Successfully updated group", updateGroup });
  } catch (err) {
    next(err);
  }
};

exports.getGroupById = async (req, res, next) => {
  const { groupId } = req.params;
  try {
    const group = await GroupPage.findOne({
      where: { id: groupId },
    });

    res.status(200).json(group);
  } catch (err) {
    next(err);
  }
};
