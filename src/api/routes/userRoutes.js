const express = require("express");

const {
  viewRegister,
  viewLogin,
  registerUser,
  loginUser,
} = require("../controllers/userController");

const {
  validateUserRegister,
  validateUserLogin,
  validateUserEmail,
  validatePasswordComplexity,
} = require("../middlewares/userInputValidation");

const userRouter = express.Router();

// Get register and login views.
userRouter.get("/register", viewRegister);
userRouter.get("/login", viewLogin);

// Create and Login User.
userRouter.post(
  "/register",
  [validateUserRegister, validateUserEmail, validatePasswordComplexity],
  registerUser
);

userRouter.post(
  "/login",
  [validateUserLogin, validatePasswordComplexity],
  loginUser
);

module.exports = userRouter;
