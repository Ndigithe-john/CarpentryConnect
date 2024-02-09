const express = require("express");
require("dotenv").config();
const app = express();
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const { v4 } = require("uuid");
const { createClient } = require("redis");
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

    const redis_client = createClient();
    redis_client.connect();
    redis_client.on("connect", () => console.log("Connected to Redis"));
    const redis_store = new RedisStore({ client: redis_client, prefix: "" });
    app.use((req, res, next) => {
      req.pool = pool;
      next();
    });
    app.use(
      session({
        store: redis_store,
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        genid: () => v4(),
        resave: false,
        rolling: true,
        unset: "destroy",
        cookie: {
          httpOnly: true,
          secure: false,
          maxAge: oneDay,
          domain: "localhost",
        },
      })
    );
    app.get("/", (req, res) => {
      req.session.authorized = true;
      req.session.user = "vic";
      console.log(req.sessionID);
      res.send("okay");
    });
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
