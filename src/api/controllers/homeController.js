const viewHomeMessage = (_, res) => {
  return res.status(200).json({ message: "Welcome to your Task Manager!" });
};

module.exports = viewHomeMessage;
