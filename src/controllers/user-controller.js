const fs = require("fs"); //# library from nodes handle file delete img
const cloudinary = require("../utils/cloudinary");
const { User } = require("../models");

exports.updateProfile = async (req, res, next) => {
  try {
    const value = req.body;
    console.log(value);

    // console.log(req.files);
    if (value.profileImage) {
      const profileImage = await cloudinary.upload(
        req.files.profileImage[0].path
      );

      value.profileImage = profileImage;
    }
    // value = {profileImage, email };

    await User.update(value, { where: { id: req.user.id } });
    // { profileImage: "http://" },
    const newUser = await User.findOne({ where: { id: req.user.id } });

    res.status(200).json({ message: "Sucessful update", newUser });
  } catch (err) {
    next(err);
  } finally {
    if (req.files.profileImage) {
      fs.unlinkSync(req.files.profileImage[0].path);
      //#delete asynchronus each img
    }
  }
};
