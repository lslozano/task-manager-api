const { userService } = require("../services/index");
const NotFoundError = require("../errors/NotFoundError");
const DatabaseError = require("../errors/DatabaseError");

const validateUserPassword = require("../../../utils/validateUserPassword");
const createToken = require("../../../utils/createToken");
const createCookie = require("../middlewares/createCookie");

const viewRegister = (_, res) => {
  return res.status(200).json({ message: "Welcome to the register page!" });
};

const viewLogin = (_, res) => {
  return res.status(200).json({ message: "Welcome to the login page!" });
};

const registerUser = async (req, res, next) => {
  try {
    const body = req.body;

    const newUser = await userService.create(body);

    if (!newUser) {
      throw new DatabaseError("Failed to create user");
    }

    const token = createToken(newUser);

    createCookie(res, token);

    return res.status(201).redirect("/profile");
  } catch (error) {
    next(error);
  }
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

    const token = createToken(user);

    createCookie(res, token);

    return res.status(201).redirect("/profile");
  } catch (error) {
    next(error);
  }
};

const logoutUser = (_, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return res.redirect("/");
};

const deleteUser = async (req, res, next) => {
  try {
    const { id: userId } = req.user;

    await userService.findOneAndDelete(userId);

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.redirect("/");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  viewRegister,
  viewLogin,
  registerUser,
  loginUser,
  logoutUser,
  deleteUser,
};
