import Sequelize from "Sequelize";
import config from "./config/config.json";

const environment = process.env.NODE_ENV;

const sequelize = new Sequelize(
  config[environment].database,
  config[environment].username,
  config[environment].password,
  {
    host: config[environment].host,
    dialect: config[environment].dialect,
  }
);

export { Sequelize, sequelize };
