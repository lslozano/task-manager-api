require("dotenv").config();
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const createToken = (res, userData) => {
  const { username, password } = userData;

  const payload = { username, password };

  const options = {
    expiresIn: "24h",
  };

  const token = jwt.sign(payload, SECRET_KEY, options);

  return token;
};

module.exports = createToken;
