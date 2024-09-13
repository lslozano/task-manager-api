require("dotenv").config();
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const createToken = (userData) => {
  const { _id: id, username, role } = userData;

  const payload = { id, username, role };

  const options = {
    expiresIn: "24h",
  };

  const token = jwt.sign(payload, SECRET_KEY, options);

  return token;
};

module.exports = createToken;
