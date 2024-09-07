const viewProfile = (req, res) => {
  return res.status(200).json({
    message: "Profile accessed",
    user: req.user,
  });
};

module.exports = { viewProfile };
