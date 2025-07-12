const { gadget } = require("../models");
const { randomCodenameGenerator } = require("../utils/randomCodenameGenerator");
const { randomStringGenerator } = require("../utils/randomStringGenerator");

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
    const randomCodename = randomCodenameGenerator();
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

module.exports.updateObjectController = async (req, res, next) => {
  const { id, newName, status } = req.body;
  if (!id) {
    const err = new Error("Id is required");
    err.statusCode = 400;
    return next(err);
  }

  try {
    const updateData = {};

    if (newName) {
      updateData.name = newName;
      updateData.codename = randomCodenameGenerator();
    }

    if (status) {
      const newStatus =
        status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

      if (newStatus === "Destroyed" || newStatus === "Decommissioned") {
        const err = new Error(
          "You are not allowed to destroy or decommission this gadget"
        );
        err.statusCode = 400;
        return next(err);
      }
      updateData.status = newStatus;
    }

    if (Object.keys(updateData).length === 0) {
      const err = new Error("No valid fields to update");
      err.statusCode = 400;
      return next(err);
    }

    await gadget.update(updateData, { where: { id } });

    const foundGadget = await gadget.findByPk(id);
    res.status(200).json({
      message: "Gadget updated successfully",
      gadget: foundGadget,
    });
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
};

module.exports.deleteObjectController = async (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    const err = new Error("Id is required");
    err.statusCode = 400;
    return next(err);
  }
  try {
    await gadget.update(
      {
        status: "Decommissioned",
        decommissionedAt: new Date(),
      },
      {
        where: {
          id: id,
        },
      }
    );
    const foundGadget = await gadget.findOne({ where: { id } });
    res.status(200).json({
      message: "Gadget deleted successfully",
      gadget: foundGadget,
    });
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
};

module.exports.selfDestructController = async (req, res, next) => {
  const id = req.params.id;
  try {
    await gadget.update(
      {
        status: "Destroyed",
        decommissionedAt: new Date(),
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).json({
      message: `Gadget ${id} self-destructed successfully`,
      SelfDectructCode: randomStringGenerator(),
    });
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
};
