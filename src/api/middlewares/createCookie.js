const createCookie = (res, token) => {
  const oneDay = 24 * 60 * 60 * 1000;

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: oneDay,
  });
};

module.exports = createCookie;
