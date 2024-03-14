const express = require("express");
const router = express.Router();
const {
  accessToken,
  lipa_na_mpesa,
  CallBack,
} = require("../controllers/lipanaMpesa");

router.get("/access_token", accessToken);
router.post("/stk/push", accessToken, lipa_na_mpesa);
router.post("/callback", CallBack);
module.exports = router;
