const sequelizeInstance = require("../config/db");

const db = {};
db.sequelize = sequelizeInstance;

db.User = require("./user-model")(sequelizeInstance);

module.exports = db;
