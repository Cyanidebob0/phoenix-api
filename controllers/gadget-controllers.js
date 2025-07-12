const { gadget } = require("../models");
const codenames = require("../utils/codename");

module.exports.createObjectController = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    const err = new Error("Name is required");
    err.statusCode = 400;
    return next(err);
  }
  if (await gadget.findOne({ where: { name: name.toLowerCase() } })) {
    const err = new Error("Gadget already exists");
    err.statusCode = 409;
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

module.exports.findObjectController = async (req, res, next) => {
  try {
    const gadgets = await gadget.findAll();
    res.status(200).json({
      message: "Gadgets fetched successfully",
      gadgets: gadgets.map((gadget) => {
        return {
          id: gadget.id,
          name: `${gadget.name} - ${Math.floor(
            Math.random() * 100
          )}% success probability`,
          codename: gadget.codename,
          status: gadget.status,
          decommissionedAt: gadget.decommissionedAt,
        };
      }),
    });
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
};
