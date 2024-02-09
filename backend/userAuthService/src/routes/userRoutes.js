const express = require("express");
const { signUp, login } = require("../controllers/userControllers");
const user = require("../utils/getUser");
const manageSessions = require("../middlewares/userAuthentication");
const userRoutes = express.Router();

userRoutes.post("/signup", signUp);
userRoutes.get("/user", user);
userRoutes.post("/login", login);
module.exports = userRoutes;
