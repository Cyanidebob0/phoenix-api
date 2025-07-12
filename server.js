require("dotenv").config();
const debug = require("debug")("development:server");
const app = require("./app");
const db = require("./models");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    debug(`Database synced`);
    app.listen(PORT, () => {
      debug(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    debug(error);
    process.exit(1);
  }
};

startServer();
