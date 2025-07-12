const express = require("express");
const { registerController } = require("../controllers/auth-controllers");
const router = express.Router();

router.post("/register", registerController);

router.post("/login", (req, res) => {
  res.send("Login");
});

module.exports = router;
