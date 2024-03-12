const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();

async function startMpesaServer() {
  app.get("/", (req, res) => {
    res.send("Changing the world");
  });

  const port = process.env.PORT || 8001;

  app.listen(port, (error, live) => {
    if (error) {
      console.log(error);
    } else console.log(`App running on port ${port}`);
  });
}

startMpesaServer();
