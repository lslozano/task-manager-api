const getHomeMessage = (_, res) => {
  res.status(200).json({ message: "Welcome to your Task Manager!" });
};

module.exports = getHomeMessage;
