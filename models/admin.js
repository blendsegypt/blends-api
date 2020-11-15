module.exports = function (sequelize, DataTypes) {
  const Admin = sequelize.define(
    "Admin",
    {
      // Model attributes are defined here
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Other model options go here
    }
  );
  return Admin;
};
