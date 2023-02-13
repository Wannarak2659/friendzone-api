const Joi = require("Joi");
const validate = require("./validate");

const createPostSchema = Joi.object({
  //   title: Joi.string().trim(),
}).options({ allowUnknown: true });

exports.validateCreatePost = validate(createPostSchema);
