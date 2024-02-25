const express = require("express");
const postroutes = express.Router();

const {
  postItem,
  getAllItems,
  getPendingItems,
  updateWorkshopItemStatus,
  deleteItems,
  carpenterPostItem,
  getItemsByUserID,
  getCarpenterItemByID,
  getWorkshoItemByID,
  getCarpenterPosts,
  getWorkShopPending,
  getWorkshopApproved,
  getRejectedApproval,
} = require("../controllers/capentryControllers");
const {
  workCarpenterRequest,
  approveJobRequest,
} = require("../controllers/ordersControllers");
const capentyService = require("../middlewares/capentryAuth");

postroutes.use(capentyService);
postroutes.post("/post", postItem);
postroutes.get("/Pending", getPendingItems);
postroutes.get("/allItems", getAllItems);
postroutes.get("/userItems", getItemsByUserID);
postroutes.patch("/update", updateWorkshopItemStatus);
postroutes.delete("/delete", deleteItems);
postroutes.post("/carpenterPost", carpenterPostItem);
postroutes.get(`/carpenterItem/:id`, getCarpenterItemByID);
postroutes.get("/workshopItem/:item_id", getWorkshoItemByID);
postroutes.get("/carpenterPosts", getCarpenterPosts);
postroutes.get("/workshopPending", getWorkShopPending);
postroutes.post("/jobRequest", workCarpenterRequest);
postroutes.post("/approveJobRequest", approveJobRequest);
postroutes.get("/workshopApproved", getWorkshopApproved);
postroutes.get("/workshopRejected", getRejectedApproval);
module.exports = postroutes;
