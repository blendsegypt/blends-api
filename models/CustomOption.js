module.exports = function (sequelize, DataTypes) {
  const CustomOption = sequelize.define(
    "CustomOption",
    {
      // Model Attributes are defined here
      label: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.DOUBLE,
      },
      value: {
        type: DataTypes.STRING,
      },
      active: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      //Other Model options go here
    }
  );

  return CustomOption;
};
