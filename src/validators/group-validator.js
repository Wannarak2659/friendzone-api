const Joi = require("Joi");
const validate = require("./validate");

const createGroupSchema = Joi.object({
  name: Joi.string().trim(),
  detail: Joi.string().trim(),
  groupImage: Joi.string().trim(),
}).or("name", "detail", "groupImage");

exports.validateCreateGroup = validate(createGroupSchema);
