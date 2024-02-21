const express = require("express");
const postroutes = express.Router();

const {
  postItem,
  getAllItems,
  getPendingItems,
  updateWorkshopItemStatus,
  deleteWorkshopItem,
  carpenterPostItem,
} = require("../controllers/capentryControllers");
const capentyService = require("../middlewares/capentryAuth");

postroutes.use(capentyService);
postroutes.post("/post", postItem);
postroutes.get("/Pending", getPendingItems);
postroutes.get("/allItems", getAllItems);
postroutes.patch("/update", updateWorkshopItemStatus);
postroutes.delete("/delete", deleteWorkshopItem);
postroutes.post("/post", carpenterPostItem);
module.exports = postroutes;
