const AppError = require("../utils/appError");

async function workCarpenterRequest(req, res, next) {
  try {
    const job_body = req.body;
    const { pool } = req;
    const user = req.user;
    const { ItemID, EstimatedCompletionDate, AdditionalNotes } = job_body;
    if (pool.connected) {
      const job_request = await pool
        .request()
        .input("CarpenterID", user.UserID)
        .input("ItemID", ItemID)
        .input("EstimatedCompletionDate", EstimatedCompletionDate)
        .input("AdditionalNotes", AdditionalNotes)
        .execute("RequestJob");
      res.status(200).json({
        status: true,
        message: "Job request Sent successfully",
      });
    } else {
      return next(new AppError("Cant process your request at the moment", 404));
    }
  } catch (error) {
    console.log(error);
    return next(new AppError("Internal Server Error", 500));
  }
}

module.exports = { workCarpenterRequest };
