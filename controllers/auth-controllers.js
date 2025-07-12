const passwordhash = require("../utils/passwordhash");
const { user } = require("../models");
const jwtToken = require("../utils/tokenGenerated");

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
        message: "User already exists",
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
