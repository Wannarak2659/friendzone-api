const fs = require("fs"); //# library from nodes handle file delete img
const cloudinary = require("../utils/cloudinary");
const { User } = require("../models");

exports.updateProfileImage = async (req, res, next) => {
  try {
    // let value;

    // console.log(req.files);
    const profileImage = await cloudinary.upload(
      req.files.profileImage[0].path
    );
    value = { profileImage };

    await User.update(value, { where: { id: req.user.id } });
    // // { profileImage: "http://" },

    res.status(200).json({ message: "Successful update" });
  } catch (err) {
    next(err);
  } finally {
    if (req.files.profileImage) {
      fs.unlinkSync(req.files.profileImage[0].path);
      //#delete asynchronus each img
    }
  }
};
