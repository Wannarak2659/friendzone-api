const {
  validateRegister,
  validateLogin,
} = require("../validators/auth-validators");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const createError = require("../utils/create-error");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
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
    // #10 = salt number

    await User.create(value);

    res.status(201).json({ message: "Register success" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    // #value has key email and password
    const value = validateLogin(req.body);
    //# SELECT * FROM user where email = value.email OR pass
    const user = await User.findOne({
      where: {
        [Op.or]: { email: value.email || "" }, //????
      },
    });
    if (!user) {
      createError("Plese enter a valid email ", 400);
      // #no user'email in db
    }
    // # compare password from user enter and db,
    const isValid = await bcrypt.compare(value.password, user.password);
    if (!isValid) {
      createError("Plese enter a valid password ", 400);
    }

    const accessToken = jwt.sign(
      {
        // payload
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
        // # 3 params 1. gen user from method findOne 2.secretKey 3.option
      }
    );
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.getUser = (req, res, next) => {
  res.status(200).json({ user: req.user });
  // # req.user from authenticate
};
