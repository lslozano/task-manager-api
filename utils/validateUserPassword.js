const bcryptjs = require("bcryptjs");
const ValidationError = require("../src/api/errors/ValidationError");

const validateUserPassword = async (inputPassword, hashedPassword) => {
  const isCorrectPassword = await bcryptjs.compare(
    inputPassword,
    hashedPassword
  );

  if (!isCorrectPassword) {
    throw new ValidationError("Invalid Credentials");
  }
};

module.exports = validateUserPassword;
