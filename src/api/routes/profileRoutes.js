const express = require("express");
const { viewProfile } = require("../controllers/profileController.js");

const profileRouter = express.Router();

profileRouter.get("/", viewProfile);

module.exports = profileRouter;
