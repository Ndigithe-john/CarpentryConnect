const AppError = require("../utils/appError");
const {
  jobRequestValidator,
  jobApprovalValidator,
} = require("../validators/jobRequestValidator");

async function workCarpenterRequest(req, res, next) {
  try {
    const job_body = req.body;
    const { pool } = req;
    const user = req.user;
    const { ItemID, EstimatedCompletionDate, AdditionalNotes } = job_body;
    const { value, error } = jobRequestValidator(job_body);

    if (error) {
      return next(new AppError(error.details[0].message, 400));
    }

    if (pool.connected) {
      const existingRequest = await pool
        .request()
        .input("CarpenterID", user.id)
        .input("ItemID", ItemID)
        .query(
          "SELECT TOP 1 1 FROM WorkRequests WHERE CarpenterID = @CarpenterID AND ItemID = @ItemID"
        );

      if (existingRequest.recordset && existingRequest.recordset.length > 0) {
        return next(
          new AppError("You have already requested for this job", 400)
        );
      }

      const itemExists = await pool
        .request()
        .input("ItemID", ItemID)
        .query("SELECT TOP 1 1 FROM WorkshopItems WHERE ItemID = @ItemID");

      if (!itemExists.recordset || itemExists.recordset.length === 0) {
        return next(
          new AppError("No item found with the provided ItemID", 404)
        );
      }

      const job_request = await pool
        .request()
        .input("CarpenterID", user.id)
        .input("ItemID", ItemID)
        .input("EstimatedCompletionDate", EstimatedCompletionDate)
        .input("AdditionalNotes", AdditionalNotes)
        .execute("RequestJob");

      res.status(200).json({
        status: true,
        message: "Job request sent successfully",
      });
    } else {
      return next(
        new AppError("Can't process your request at the moment", 500)
      );
    }
  } catch (error) {
    console.error(error);
    return next(new AppError("Internal server error", 500));
  }
}

async function approveJobRequest(req, res, next) {
  try {
    const { pool } = req;
    const { RequestID } = req.body;

    // Validate the request body
    const { Error } = jobApprovalValidator(req.body);
    if (Error) {
      return next(new AppError(Error.details[0].message, 400));
    }

    if (pool.connected) {
      const job_approve = await pool
        .request()
        .input("RequestID", RequestID)
        .execute("ApproveWorkRequest");

      if (job_approve.rowsAffected[0] === 0) {
        return next(
          new AppError("Job request not found or couldn't be approved", 404)
        );
      }

      res.status(200).json({
        status: true,
        message: "Job Request Approved successfully",
      });
    } else {
      return next(new AppError("Error connecting to the database", 500));
    }
  } catch (error) {
    console.error(error);
    if (error.message.includes("some_specific_error_condition")) {
      return next(new AppError("Specific error message", 400));
    }
    res.status(500).send(error.message);
  }
}

async function rejectJobRequest(req, res, next) {
  try {
    const { pool } = req;
    const { RequestID } = req.body;
  } catch (error) {}
}

module.exports = { workCarpenterRequest, approveJobRequest, rejectJobRequest };
