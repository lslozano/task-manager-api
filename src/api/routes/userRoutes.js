const express = require("express");
const {
  getRegister,
  registerUser,
  getLogin,
  loginUser,
} = require("../controllers/userController");
const {
  validateUserInput,
  validateUserEmail,
  validatePasswordComplexity,
} = require("../middlewares/userInputValidation");

const userRouter = express.Router();

userRouter.get("/register", getRegister);

userRouter.post(
  "/register",
  [validateUserInput, validateUserEmail, validatePasswordComplexity],
  registerUser
);

userRouter.get("/login", getLogin);

userRouter.post(
  "/login",
  [validateUserInput, validatePasswordComplexity],
  loginUser
);

module.exports = userRouter;
