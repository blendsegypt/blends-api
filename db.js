const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("blends", "root", "", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
