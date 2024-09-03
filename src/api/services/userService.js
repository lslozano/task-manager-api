const { User } = require("../models/User");
const hashPassword = require("../../../utils/hashPassword");

const create = async (data) => {
  try {
    const { firstName, lastName, username, email, password } = data;

    const hashedPassword = await hashPassword(password);

    const user = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    return user;
  } catch (error) {
    console.log("Error creating the user", error.message);
    throw error;
  }
};

const findOne = async (username) => {
  try {
    const user = User.findOne({ username });

    return user;
  } catch (error) {
    console.log("Error finding user", error.message);
    throw error;
  }
};

module.exports = {
  create,
  findOne,
};
