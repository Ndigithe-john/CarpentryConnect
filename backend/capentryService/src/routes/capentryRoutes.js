const express = require("express");
const postroutes = express.Router();

const {
  postItem,
  getPendingItems,
} = require("../controllers/capentryControllers");
const capentyService = require("../middlewares/capentryAuth");

postroutes.use(capentyService);
postroutes.post("/post", postItem);
postroutes.get("/Pending", getPendingItems);

module.exports = postroutes;
