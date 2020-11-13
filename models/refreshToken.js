module.exports = function (sequelize, DataTypes) {
  const RefreshToken = sequelize.define(
    "RefreshToken",
    {
      // Model Attributes are defined here
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      token: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      // Other Model options
    }
  );

  return RefreshToken;
};
