const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;
  try {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    }
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ message: "Error: Not Authorized" });
  }
  if (!token) {
    res.status(401).json({ message: "Error: Not Authorized" });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Error: Not Authorized" });
  }
};

module.exports = { protect, admin };
