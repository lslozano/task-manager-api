const { userRequiredFields } = require("../../../utils/requiredModelsFields");

const validateUserRegister = (req, res, next) => {
  const body = req.body;

  for (const field of userRequiredFields) {
    if (!body[field] || body[field].trim() === "") {
      return res.status(400).json({ error: `${field} is required` });
    }
  }

  next();
};

const validateUserLogin = (req, res, next) => {
  const { username, password } = req.body;

  if (
    !username ||
    username.trim() === "" ||
    !password ||
    password.trim() === ""
  ) {
    return res.status(400).json({ error: `Login credentials are required` });
  }

  next();
};

const validateUserEmail = (req, res, next) => {
  const body = req.body;
  const { email } = body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  next();
};

const validatePasswordComplexity = (req, res, next) => {
  const body = req.body;
  const { password } = body;

  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password does not meet complexity requirements" });
  }

  next();
};

module.exports = {
  validateUserRegister,
  validateUserLogin,
  validateUserEmail,
  validatePasswordComplexity,
};
