const jwt = require("jsonwebtoken");
module.exports = (id, username, fullname) => {
  const token = jwt.sign({ id, username, fullname }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};
