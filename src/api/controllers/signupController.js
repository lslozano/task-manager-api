const signupService = require("../services/signupService");

const getSignup = (_, res) => {
  res.status(200).json({ message: "Welcome to the signup page!" });
};

const signupUser = async (req, res) => {
  try {
    const body = req.body;

    const newUser = await signupService.createUser(body);

    if (!newUser) {
      throw new Error("Something went wrong creating the user");
    }

    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getSignup,
  signupUser,
};
