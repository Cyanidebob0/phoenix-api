const express = require("express");
const auth = require("./routes/auth");
const gadget = require("./routes/gadget");
const path = require("path");
const cookieParser = require("cookie-parser");
const { checkTokenInHeader } = require("./middlewares/isLoggedIn");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.use("/api", auth);
app.use("/api/gadgets", checkTokenInHeader, gadget);

module.exports = app;
