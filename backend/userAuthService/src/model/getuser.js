const joi = require("joi");

const getUserSchema = joi.object({
  Email: joi.string().required(),
});
const update_schema = joi.object({
  Bio: joi.string().optional(),
  ProfilePhoto: joi.string().optional(),
});
module.exports = { getUserSchema, update_schema };
