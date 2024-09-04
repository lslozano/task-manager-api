const userService = require("../services/userService");
const validateUserPassword = require("../../../utils/validateUserPassword");
const NotFoundError = require("../errors/NotFoundError");
const DatabaseError = require("../errors/DatabaseError");

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

    res.status(200).json({
      message: "User registered",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

const getLogin = (_, res, next) => {
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

    res.status(200).json(user);
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
