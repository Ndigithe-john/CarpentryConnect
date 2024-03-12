const axios = require("axios");
const consumerKey = process.env.CONSUMERKEY;
const consumerSecret = process.env.CONSUMERSECRET;
function accessToken(req, res, next) {
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
      req.access_token = data;
      next();
    });
}

module.exports = { accessToken };
