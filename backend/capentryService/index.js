const express = require("express");
require("dotenv").config();
const sql = require("mssql");
const app = express();
app.use(express.json());
const AppError = require("./src/utils/appError");
const globalErrorHandlers = require("./src/controllers/errorControllers");
const config = require("./src/config/databaseConfig");

async function capentryServer() {
  try {
    let pool = await sql.connect(config);

    console.log("Connected to the database");
    app.use((req, res, next) => {
      req.pool = pool;
      next();
    });
    app.all("*", (req, res, next) => {
      next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
    });
    app.use(globalErrorHandlers);
    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log(`App running on port ${port}`);
    });
  } catch (error) {
    return next(new AppError(`Unable to access the server`, 500));
  }
}

capentryServer();
