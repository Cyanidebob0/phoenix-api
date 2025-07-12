const express = require("express");
const auth = require("./routes/auth");
// const gadet = require("./routes/gadet");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", auth);
// app.use("/api/gadet", gadet);

module.exports = app;
