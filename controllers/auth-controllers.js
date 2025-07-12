const passwordhash = require("../utils/passwordhash");
const { user } = require("../models");
const jwtToken = require("../utils/tokenGenerated");
const bcrypt = require("bcrypt");

module.exports.registerController = async (req, res) => {
  const { fullname, username, password } = req.body;

  if (!fullname || !username || !password) {
    return res.status(400).json({
      message: "Bad Request",
      error: "All fields are required",
    });
  }

  try {
    if (await user.findOne({ where: { username } })) {
      return res.status(409).json({
        message: "User already exists please login",
        error: "User already exists",
      });
    }
    const hashedpassword = await passwordhash(password);
    const createduser = await user.create({
      fullname,
      username,
      password: hashedpassword,
    });

    token = jwtToken(createduser.id, createduser.username);
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: createduser.id,
        fullname: createduser.fullname,
        username: createduser.username,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports.loginController = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "Bad Request",
      error: "All fields are required",
    });
  }

  try {
    const founduser = await user.findOne({ where: { username } });
    if (!founduser) {
      return res.status(401).json({
        message: "User not found please register",
        error: "User not found",
      });
    }
    const isPasswordMatched = await bcrypt.compare(
      password,
      founduser.password
    );
    if (!isPasswordMatched) {
      return res.status(401).json({
        message: "Invalid credentials",
        error: "Invalid credentials",
      });
    }
    token = jwtToken(founduser.id, founduser.username);
    res.status(200).json({
      message: "User logged in successfully",
      token,
      user: {
        id: founduser.id,
        fullname: founduser.fullname,
        username: founduser.username,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
