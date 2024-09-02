const bcryptjs = require("bcryptjs");
const { User } = require("../models/User");

const createUser = async (data) => {
  try {
    const { firstName, lastName, username, email, hashPassword } = data;

    const hashedPassword = await bcryptjs.hash(hashPassword, 10);

    const user = new User({
      firstName,
      lastName,
      username,
      email,
      hashPassword: hashedPassword,
    });

    await user.save();

    return user;
  } catch (error) {
    console.log("Error creating the user", error.message);

    throw new Error("Failed to create the user");
  }
};

module.exports = {
  createUser,
};
