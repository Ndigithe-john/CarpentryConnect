const joi = require("joi");
const getchatSchema = joi.object({
  Participant2ID: joi.number().required(),
});

module.exports = { getchatSchema };
