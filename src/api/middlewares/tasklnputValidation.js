const validateTaskRequiredFields = (req, res, next) => {
  const { title, createdBy } = req.body;

  if (
    title === "" ||
    title === undefined ||
    createdBy === "" ||
    createdBy === undefined
  ) {
    return res.status(400).json({ error: "Task required fields are missing" });
  }

  next();
};

module.exports = validateTaskRequiredFields;
