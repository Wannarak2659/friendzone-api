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

    // insert data to dbbase
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
