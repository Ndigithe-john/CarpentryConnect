const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const port = process.env.PORT || 8001;
const router = require('./src/routes/mpesaRoutes')
async function startMpesaServer() {
  try {
    app.get("/", (req, res) => {
      res.send("Changing the world");
    });

    app.use(router);
    app.listen(port, (error) => {
      if (error) {
        console.log(error);
      } else console.log(`App running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startMpesaServer();
