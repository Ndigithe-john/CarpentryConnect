const joi = require("joi");
const loginSchema = joi.object({
  Email: joi.string().required(),
  Password: joi.string().required,
});

module.exports = { loginSchema };
