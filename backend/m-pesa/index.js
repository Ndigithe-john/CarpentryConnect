const express = require("express");
const app = express();
const axios = require("axios");
app.use(express.json());
require("dotenv").config();
const port = process.env.PORT || 8001;
const consumerKey = process.env.CONSUMERKEY;
const consumerSecret = process.env.CONSUMERSECRET;
async function startMpesaServer() {
  try {
    app.get("/", (req, res) => {
      res.send("Changing the world");
    });

    app.get("/access_token", (req, res) => {
      const url = `https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials`;
      const auth =
        "Basic " +
        Buffer.from(consumerKey + ":" + consumerSecret).toString("base64");
      const headers = {
        Authorization: auth,
      };
      axios
        .get(url, {
          headers: headers,
        })
        .then((response) => {
          let data = response.data;
          res.send(data);
        });
    });

    app.listen(port, (error, live) => {
      if (error) {
        console.log(error);
      } else console.log(`App running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startMpesaServer();
