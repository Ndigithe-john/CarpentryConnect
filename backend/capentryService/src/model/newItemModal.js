const joi = require("joi");

const newItemSchema = joi.object({
  ImageURL: joi.string().required(),
  Description: joi.string().required(),
  Category: joi.string().required(),
  Material: joi.string().required(),
  DateRequired: joi.date().required(),
  Price: joi.number().required(),
});

module.exports = { newItemSchema };
