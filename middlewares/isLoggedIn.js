const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const err = new Error("unauthorized, please login");
    err.statusCode = 401;
    return next(err);
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch {
    const err = new Error("unauthorized, please login");
    err.statusCode = 401;
    return next(err);
  }
};
