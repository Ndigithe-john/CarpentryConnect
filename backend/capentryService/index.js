const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sql = require("mssql");
const app = express();
app.use(express.json());
const AppError = require("./src/utils/appError");
const globalErrorHandlers = require("./src/controllers/errorControllers");
const config = require("./src/config/databaseConfig");
const postroutes = require("./src/routes/capentryRoutes");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

async function capentryServer() {
  try {
    let pool = await sql.connect(config);

    console.log("Connected to the database");
    app.use((req, res, next) => {
      req.pool = pool;
      next();
    });

    app.use("/users", postroutes);
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

capentryServer();
