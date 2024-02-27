const express = require("express");
const {
  signUp,
  login,
  logout,
  getCarpenters,
  getWorkshopOwners,
  updateProfile,
} = require("../controllers/userControllers");
const user = require("../utils/getUser");
const manageSessions = require("../middlewares/userAuthentication");
const userRoutes = express.Router();

userRoutes.post("/signup", signUp);
userRoutes.get("/user", user);
userRoutes.post("/login", login);
userRoutes.delete("/logout", manageSessions, logout);
userRoutes.get("/getCarpenters", getCarpenters);
userRoutes.get("/getWorkshopOwners", getWorkshopOwners);
userRoutes.post("/updateProfile", updateProfile);
module.exports = userRoutes;
