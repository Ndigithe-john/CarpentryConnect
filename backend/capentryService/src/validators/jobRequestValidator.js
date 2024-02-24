const { jobRequestSchema } = require("../model/jobRequestModal");

function jobRequestValidator(body) {
  const new_job_request = jobRequestSchema.validate(body, {
    abortEarly: false,
  });
  if (new_job_request.error?.details.length) {
    let message = new_job_request.error.details.map((err) => err.message);
    throw new Error(message.join("\n"));
  } else {
    return new_job_request;
  }
}

module.exports = jobRequestValidator;
