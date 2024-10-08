const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json("Not authorized!");

  jwt.verify(token, process.env.secret, (err, user) => {
    if (err) {
      return res.status(403).json("Invalid token");
    }
    req.user = user;
    // console.log(req.user);
    next();
  });
};

module.exports = verifyToken;
