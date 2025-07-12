const sequelizeInstance = require("../config/db");

const db = {};
db.sequelize = sequelizeInstance;

db.user = require("./user-model")(sequelizeInstance);
db.gadget = require("./gadget-model")(sequelizeInstance);

module.exports = db;
