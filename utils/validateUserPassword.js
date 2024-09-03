const comparePassword = require("./comparePassword");

const validateUserPassword = async (inputPassword, storedPassword) => {
  const isPasswordCorrect = await comparePassword(
    inputPassword,
    storedPassword
  );

  if (!isPasswordCorrect) {
    throw new Error("Incorrect credentials");
  }
};

module.exports = validateUserPassword;
