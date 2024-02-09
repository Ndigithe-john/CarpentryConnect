const express = require("express");
const signUP = require("../controllers/userControllers");
const userRoutes = express.Router();

userRoutes.post("/signup", signUP);

module.exports = userRoutes;
