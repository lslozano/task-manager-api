const express = require("express");
const { getSignup, signupUser } = require("../controllers/signupController");

const signupRouter = express.Router();

signupRouter.get("/", getSignup);
signupRouter.post("/", signupUser);

module.exports = signupRouter;
