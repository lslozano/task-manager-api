const express = require("express");
const getHomeMessage = require("../controllers/homeController");

const homeRouter = express.Router();

homeRouter.get("/", getHomeMessage);

module.exports = homeRouter;
