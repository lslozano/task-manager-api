const { userRequiredFields } = require("../../../utils/requiredModelsFields");

const validateUserInput = (req, res, next) => {
  const method = req.method;
  const body = req.body;
  const { username, password } = body;

  if (method === "GET") {
    for (const field of userRequiredFields) {
      if (!body[field] || body[field].trim() === "") {
        return res.status(400).json({ error: `${field} is required` });
      }
    }
  }

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
  validateUserInput,
  validateUserEmail,
  validatePasswordComplexity,
};
