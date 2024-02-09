const express = require("express");
require("dotenv").config();
const app = express();
const sql = require("mssql");
const config = require("./src/config/databaseConfig");
app.use(express.json());
async function startServer() {
  try {
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (error) {}
}
startServer();
