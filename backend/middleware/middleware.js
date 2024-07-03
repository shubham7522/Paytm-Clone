const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const authMiddleware = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];
  try {
    const decoded = jwt.verify(bearerToken, JWT_SECRET);
    req.userId = decoded.userId;
    next();
    // return res.json({ msg: "The data exist" });
  } catch (error) {
    return res.status(403).json();
  }
};

module.exports = { authMiddleware };
