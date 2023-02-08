const { validateRegister } = require("../validators/auth-validators");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const createError = require("../utils/create-error");

exports.register = async (req, res, next) => {
  try {
    s;
    // # query to db for validate exist email account
    const value = validateRegister(req.body);
    const user = await User.findOne({
      where: {
        [Op.or]: { email: value.email || "" },
      },
    });

    if (user) {
      createError("Email is already in use", 400);
    }

    value.password = await bcrypt.hash(value.password, 10);
    // # 10 = salt number

    await User.create(value);

    res.status(201).json({ message: "Register success" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
