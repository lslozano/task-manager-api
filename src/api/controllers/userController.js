const userService = require("../services/userService");
const validateUserPassword = require("../../../utils/validateUserPassword");

const getRegister = (_, res) => {
  res.status(200).json({ message: "Welcome to the register page!" });
};

const registerUser = async (req, res) => {
  try {
    const body = req.body;

    const newUser = await userService.create(body);

    if (!newUser) {
      throw new Error("Something went wrong creating the user");
    }

    res.status(200).json({
      message: "User registered",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLogin = (_, res) => {
  res.status(200).json({ message: "Welcome to the login page!" });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userService.findOne(username);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const { password: userPassword } = user;

    await validateUserPassword(password, userPassword);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getRegister,
  registerUser,
  getLogin,
  loginUser,
};
