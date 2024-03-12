const express = require("express");
const router = express.Router();
const { accessToken, lipa_na_mpesa } = require("../controllers/lipanaMpesa");

router.get("/access_token", accessToken);
router.post("/stk/push", accessToken, lipa_na_mpesa);

module.exports = router;
