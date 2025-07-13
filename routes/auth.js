const express = require("express");
const { checkTokenInCookie } = require("../middlewares/isLoggedIn");
const {
  registerController,
  loginController,
} = require("../controllers/auth-controllers");

const router = express.Router();

router.get("/register", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/info", checkTokenInCookie, (req, res) => {
  res.render("info", { user: req.user, token: req.cookies.token });
});

router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;
