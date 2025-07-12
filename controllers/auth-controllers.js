const passwordhash = require("../utils/passwordhash");
const { user } = require("../models");
const jwtToken = require("../utils/tokenGenerated");
const bcrypt = require("bcrypt");

module.exports.registerController = async (req, res, next) => {
  const { fullname, username, password } = req.body;

  if (!fullname || !username || !password) {
    const err = new Error("All fields are required");
    err.statusCode = 400;
    return next(err);
  }

  try {
    if (await user.findOne({ where: { username } })) {
      const err = new Error("User already exists please login");
      err.statusCode = 409;
      return next(err);
    }
    const hashedpassword = await passwordhash(password);
    const createduser = await user.create({
      fullname,
      username,
      password: hashedpassword,
    });

    const token = jwtToken(createduser.id, createduser.username);
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
    error.statusCode = 500;
    return next(error);
  }
};

module.exports.loginController = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    const err = new Error("All fields are required");
    err.statusCode = 400;
    return next(err);
  }

  try {
    const founduser = await user.findOne({ where: { username } });
    if (!founduser) {
      const err = new Error("User not found please register");
      err.statusCode = 401;
      return next(err);
    }
    const isPasswordMatched = await bcrypt.compare(
      password,
      founduser.password
    );
    if (!isPasswordMatched) {
      const err = new Error("Invalid credentials");
      err.statusCode = 401;
      return next(err);
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
    error.statusCode = 500;
    return next(error);
  }
};
