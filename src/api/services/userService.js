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
    throw error;
  }
};

const findOne = async (username) => {
  try {
    const user = await User.findOne({ username });

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  findOne,
};
