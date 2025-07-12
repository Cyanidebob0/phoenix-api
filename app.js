const express = require("express");
const auth = require("./routes/auth");
const gadget = require("./routes/gadget");
const isLoggedIn = require("./middlewares/isLoggedIn");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", auth);
app.use("/api/gadgets", gadget);

module.exports = app;
