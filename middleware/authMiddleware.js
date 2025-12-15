const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT_SECRET from .env
    req.user = { userId: decoded.userId };
    // console.log("jwt decoded:",decoded)
    // console.log("User ID:", userId);

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = auth;
