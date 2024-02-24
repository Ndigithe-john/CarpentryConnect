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
} = require("../controllers/capentryControllers");
const capentyService = require("../middlewares/capentryAuth");

postroutes.use(capentyService);
postroutes.post("/post", postItem);
postroutes.get("/Pending", getPendingItems);
postroutes.get("/allItems", getAllItems);
postroutes.get("/userItems", getItemsByUserID);
postroutes.patch("/update", updateWorkshopItemStatus);
postroutes.delete("/delete", deleteItems);
postroutes.post("/carpenterPost", carpenterPostItem);
postroutes.get(`/item/:id`, getCarpenterItemByID);
module.exports = postroutes;
