const { gadget } = require("../models");
const codenames = require("../utils/codename");

module.exports.createObjectController = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    const err = new Error("Name is required");
    err.statusCode = 400;
    return next(err);
  }
  try {
    const randomCodename =
      codenames[Math.floor(Math.random() * codenames.length)];

    const createdGadget = await gadget.create({
      name,
      codename: randomCodename,
    });
    res.status(201).json({
      message: "Gadget created successfully",
      gadget: createdGadget,
    });
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
};
