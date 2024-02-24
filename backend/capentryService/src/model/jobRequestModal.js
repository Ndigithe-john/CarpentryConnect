const joi = require("joi");

const jobRequestSchema = joi.object({
  ItemID: joi.required(),
  EstimatedCompletionDate: joi.date().required(),
  AdditionalNotes: joi.string().optional(),
});

const jobApprovalSchema = joi.object({
  RequestID: joi.number().required(),
});

module.exports = { jobRequestSchema, jobApprovalSchema };
