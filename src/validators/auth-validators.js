const Joi = require("joi");
const validate = require("./validate");

const registerSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    "any.required": "First name is required",
    "string.empty": "First name is required",
    "string.base": "First name must be a string",
  }),
  lastName: Joi.string().trim().required().messages({
    "any.required": "Last name is required",
    "string.empty": "last name is required",
    "string.base": "last name must be a string",
  }),
  email: Joi.string().email({ tlds: false }).messages({
    "string.empty": "Email is required",
    "string.email": "Please enter a valid email",
    // .strip()
    // strip = validate completed and make is invisible
  }),

  password: Joi.string().alphanum().min(8).required().trim().messages({
    "string.empty": "password is required",
    "string.alphanum": "password must be a number or alphabet",
    "string.min": "password must have at lest 8 characters",
  }),

  //
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .trim()
    .messages({
      "any.only": "password and confirm did not match",
      "string.empty": "confirm password is required",
    }),
  // .strip(),
});

// # import fnc from validate
exports.validateRegister = validate(registerSchema);
// exports.validateLogin = validate(loginSchema);

// // ########### validate LOGIN
// // const loginSchema = Joi.object({
// //   email: Joi.string().required(),
// //   password: Joi.string().required(),
// // });
