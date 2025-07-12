const express = require("express");
const dotenv = require("dotenv");
const auth = require("./routes/auth");
const gadet = require("./routes/gadet");
const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", auth);
// app.use("/api/gadet", gadet);

app.listen(process.env.PORT, () =>
  console.log("Server running on port " + process.env.PORT)
);
