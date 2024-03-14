const axios = require("axios");
const consumerKey = process.env.CONSUMERKEY;
const consumerSecret = process.env.CONSUMERSECRET;
const passkey = process.env.PASS_KEY;
const { getPassword, getTimestamp } = require("../utils/utils");
function accessToken(req, res, next) {
  try {
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
        res.status(200).json({ access_token: data.access_token });
        req.access_token = data.access_token;
        next();
      });
  } catch (error) {
    console.log(error);
  }
}
function lipa_na_mpesa(req, res, next) {
  const stkUrl =
    "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
  // let amount_payable = req.query.amount;
  let amount_payable = 1;
  let account_reference = req.query.acc_ref;
  // let phoneNumber = req.query.phoneNumber;
  let phoneNumber = +254769968711;
  let Token = req.access_token;
  console.log(Token);
  let headerToken = `Bearer ${Token}`;
  let timestamp = getTimestamp();
  let password = getPassword(174379, passkey, timestamp);
  let data = {
    BusinessShortCode: "174379",
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount_payable,
    PartyA: phoneNumber,
    PartyB: "174379",
    PhoneNumber: phoneNumber,
    CallBackURL: "https://383d-41-89-227-171.ngrok-free.app/CallBack",
    AccountReference: account_reference,
    TransactionDesc: "Item Payment",
  };
  axios
    .post(stkUrl, data, { headers: { Authorization: headerToken } })
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
}
const CallBack = (req, res) => {
  let message = {
    ResponseCode: "0",
    ResponseDesc: "success",
  };
  if (req.body.Body.stkCallback.CallbackMetadata != undefined) {
    console.log("Payment SuccessFully");
  } else {
    console.log("Payment not SuccessFully");
  }
  console.log(req.body);
  res.json(message);
};
module.exports = { accessToken, lipa_na_mpesa, CallBack };
