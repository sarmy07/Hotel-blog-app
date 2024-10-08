const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json("Unauthorized! only for admin.");
  }
  next();
};

module.exports = verifyAdmin;
