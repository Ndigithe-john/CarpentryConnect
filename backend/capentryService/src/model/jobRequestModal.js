const joi = require("joi");

const jobRequestSchema = joi.object({
  CarpenterID: joi.required(),
  ItemID: joi.required(),
  EstimatedCompletionDate: joi.date().required(),
  AdditionalNotes: joi.string().optional(),
});

module.exports = { jobRequestSchema };
