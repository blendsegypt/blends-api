module.exports = function (sequelize, DataTypes) {
  const OTP = sequelize.define(
    "OTP",
    {
      // Model Attributes are defined here
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      OTP: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      //Other Model options go here
    }
  );

  return OTP;
};
