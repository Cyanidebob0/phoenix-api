const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Gadget = sequelize.define("gadget", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    codename: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    status: {
      type: DataTypes.ENUM(
        "Available",
        "Deployed",
        "Destroyed",
        "Decommissioned"
      ),
      defaultValue: "Available",
      allowNull: false,
    },
    decommissionedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  return Gadget;
};
