const express = require("express");
require("dotenv").config();
const app = express();
const sql = require("mssql");
const config = require("./src/config/databaseConfig");
const AppError = require("./src/utils/appError");
const globalErrorHandlers = require("./src/controllers/errorControllers");
app.use(express.json());
async function startServer() {
  const oneDay = 24 * 60 * 60 * 1000;
  try {
    const pool = await sql.connect(config);
    console.log(`connected to the database`);
    app.all("*", (req, res, next) => {
      next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
    });
    app.use(globalErrorHandlers);
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
}
startServer();
