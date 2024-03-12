const express = require("express");
const router = express.Router();
const { accessToken } = require("../controllers/lipanaMpesa");

router.get("/access_token", accessToken, (req, res) => {
  res.status(200).json({ access_token: req.access_token });
});

module.exports = router;
