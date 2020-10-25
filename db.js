import Sequelize from "Sequelize";

const sequelize = new Sequelize("blends", "root", "", {
  host: "localhost",
  dialect: "postgres",
});

export default sequelize;
