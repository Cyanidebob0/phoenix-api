const passwordHash = require("../utils/passwordHash");
const { user } = require("../models");
const tokenGenerated = require("../utils/tokenGenerated");
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
    const hashedpassword = await passwordHash(password);
    const createduser = await user.create({
      fullname,
      username,
      password: hashedpassword,
    });

    const token = tokenGenerated(
      createduser.id,
      createduser.username,
      createduser.fullname
    );
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    };
    res.cookie("token", token, cookieOptions);
    res.redirect("/api/info");
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
    const token = tokenGenerated(
      founduser.id,
      founduser.username,
      founduser.fullname
    );
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    };
    res.cookie("token", token, cookieOptions);
    res.redirect("/api/info");
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
};
