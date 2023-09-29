const jwt = require("jsonwebtoken");
const User = require("./../Model/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      return res.json({ status: 401, message: "Not authorized, token failed" });
    }
  }
  if (!token) {
    res.status(401);
    return res.json({ status: 401, message: "Not authorized, no token" });
  }
});

module.exports = { protect };
