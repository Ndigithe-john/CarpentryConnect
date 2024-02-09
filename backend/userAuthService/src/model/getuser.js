const joi = require("joi");

const getUserSchema = joi.object({
  Email: joi.string().required(),
});
module.exports = { getUserSchema };
