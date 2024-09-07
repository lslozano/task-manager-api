const userService = require("../services/userService");
const validateUserPassword = require("../../../utils/validateUserPassword");
const NotFoundError = require("../errors/NotFoundError");
const DatabaseError = require("../errors/DatabaseError");
const createToken = require("../../../utils/createToken");
const createCookie = require("../middlewares/createCookie");

const getRegister = (_, res) => {
  res.status(200).json({ message: "Welcome to the register page!" });
};

const registerUser = async (req, res, next) => {
  try {
    const body = req.body;

    const newUser = await userService.create(body);

    if (!newUser) {
      throw new DatabaseError("Failed to create user");
    }

    const token = createToken(res, newUser);

    createCookie(res, token);

    res.status(201).redirect("/profile");
  } catch (error) {
    next(error);
  }
};

const getLogin = (_, res) => {
  res.status(200).json({ message: "Welcome to the login page!" });
};

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await userService.findOne(username);

    if (!user) {
      throw new NotFoundError("The resource was not found");
    }

    const { password: userPassword } = user;

    await validateUserPassword(password, userPassword);

    const token = createToken(res, user);

    createCookie(res, token);

    console.log(token);
    res.status(201).redirect("/profile");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRegister,
  registerUser,
  getLogin,
  loginUser,
};
