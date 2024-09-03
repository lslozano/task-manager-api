const express = require("express");
const {
  getRegister,
  registerUser,
  getLogin,
  loginUser,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/register", getRegister);
userRouter.post("/register", registerUser);
userRouter.get("/login", getLogin);
userRouter.post("/login", loginUser);

module.exports = userRouter;
