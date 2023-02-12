const Joi = require("Joi");
const validate = require("./validate");

const createGroupSchema = Joi.object({
  title: Joi.string().trim(),
  image: Joi.string().trim(),
}).or("title", "image");

exports.validateCreateGroup = validate(createGroupSchema);
