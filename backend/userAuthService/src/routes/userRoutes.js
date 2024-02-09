const express = require("express");
const signUP = require("../controllers/userControllers");
const user = require("../utils/getUser");
const userRoutes = express.Router();

userRoutes.post("/signup", signUP);
userRoutes.get("/user", user);
module.exports = userRoutes;
