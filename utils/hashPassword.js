const bcryptjs = require("bcryptjs");

const hashPassword = async (password) => {
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log("Could not hash password", error.message);
    throw error;
  }
};

module.exports = hashPassword;
