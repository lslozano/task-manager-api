const express = require("express");
const viewHomeMessage = require("../controllers/homeController");

const homeRouter = express.Router();

homeRouter.get("/", viewHomeMessage);

module.exports = homeRouter;
