const AppError = require("../utils/appError");
const jobRequestValidator = require("../validators/jobRequestValidator");

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
    if (pool.connected) {
      const job_approve = await pool
        .request()
        .input("RequestID", RequestID)
        .execute("ApproveWorkRequest");
      res.status(200).json({
        status: true,
        message: "Job Request Apporved successfully",
      });
    } else {
      return next(new AppError("Error appoving job request", 401));
    }
  } catch (error) {
    console.log(error);
    return next(new AppError("Internal Server error", 500));
  }
}
module.exports = { workCarpenterRequest, approveJobRequest };
