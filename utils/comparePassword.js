const bcryptjs = require("bcryptjs");

const comparePassword = async (password, hashedPassword) => {
  try {
    const isCorrectPassword = await bcryptjs.compare(password, hashedPassword);
    return isCorrectPassword;
  } catch (error) {
    console.log("Invalid credential", error.message);
    throw error;
  }
};

module.exports = comparePassword;
