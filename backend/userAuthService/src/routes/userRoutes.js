const express = require("express");
const {
  signUp,
  login,
  logout,
  getCarpenters,
  getWorkshopOwners,
  updateProfile,
  getProfileDetails,
  getUserByID,
  createChatRoom,
  sendMessage,
  getChatRoomMessages,
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
userRoutes.get("/userProfile", getProfileDetails);
userRoutes.get("/getUser/:user_id", getUserByID);
userRoutes.post("/createChatRoom", manageSessions, createChatRoom);
userRoutes.post("/sendMessage", manageSessions, sendMessage);
userRoutes.post("/getRoomMessages", getChatRoomMessages);
module.exports = userRoutes;
