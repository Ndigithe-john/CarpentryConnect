const express = require("express");
const postroutes = express.Router();

const postItem = require("../controllers/capentryControllers");
const capentyService = require("../middlewares/capentryAuth");

postroutes.use(capentyService);
postroutes.post("/post", postItem);
postroutes.get("/Pending", getPosts);

module.exports = postroutes;
