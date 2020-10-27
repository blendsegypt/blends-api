import Sequelize from "Sequelize";
import config from "./config/config.json";

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
  }
);

export { Sequelize, sequelize };
