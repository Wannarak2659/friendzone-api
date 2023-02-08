const Joi = require("joi");
const validate = require("./validate");

const registerSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    "any.required": "Please enter your first name",
    "string.empty": "First name is required",
    "string.base": "First name must be a string",
  }),
  lastName: Joi.string().trim().required().messages({
    "any.required": "Please enter your last name",
    "string.empty": "Last name is required",
    "string.base": "Last name must be a string",
  }),
  email: Joi.string().email({ tlds: false }).messages({
    "string.empty": "Please enter your email",
    "string.email": "Please enter a valid email",
    // .strip()
    // strip = validate completed and make is invisible
  }),

  password: Joi.string().alphanum().min(8).required().trim().messages({
    "string.empty": "Please enter your password",
    "string.alphanum": "Password must be a number or alphabet",
    "string.min": "Password must have at lest 8 characters",
  }),

  //
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .trim()
    .messages({
      "any.only": "Password do not match",
      "string.empty": "Confirm password is required",
    }),
  // .strip(),
});

// # import fnc from validate
exports.validateRegister = validate(registerSchema);

// ########### validate Login
const loginSchema = Joi.object({
  email: Joi.string().trim().required().messages({
    "string.empty": "Please enter your email",
    "string.email": "Please enter a valid email",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Please enter your password",
    "string.min": "Please enter a valid password",
  }),
});

exports.validateLogin = validate(loginSchema);
