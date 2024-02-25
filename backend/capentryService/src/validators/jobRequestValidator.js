const {
  jobRequestSchema,
  jobApprovalSchema,
  jobRejectSchema,
} = require("../model/jobRequestModal");

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
function jobApprovalValidator(body) {
  const job_request_approval = jobApprovalSchema.validate(body, {
    abortEarly: false,
  });
  if (job_request_approval.error?.details?.length) {
    let message = job_request_approval.error.details.map((err) => err.message);
    throw new Error(message.join("\n"));
  } else {
    return job_request_approval;
  }
}

function jobRejectValidator(body) {
  const job_request_reject = jobRejectSchema.validate(body, {
    abortEarly: false,
  });
  if (job_request_reject.error?.details?.length) {
    const message = job_request_reject.error.details.map((err) => err.message);
    throw new Error(message.join("\n"));
  } else {
    return job_request_reject;
  }
}

module.exports = {
  jobRequestValidator,
  jobApprovalValidator,
  jobRejectValidator,
};
