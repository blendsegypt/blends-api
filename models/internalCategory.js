module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "InternalCategory",
    {
      // Model attributes are defined here
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Other model options go here
    }
  );
};
