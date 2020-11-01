module.exports = function (sequelize, DataTypes) {
  const ProductCustomOption = sequelize.define(
    "ProductCustomOption",
    {
      // Model Attributes are defined here
      label: {
        type: DataTypes.STRING,
      },
      icon: {
        type: DataTypes.STRING,
      },
      mandatory: {
        type: DataTypes.BOOLEAN,
      },
      active: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      //Other Model options go here
    }
  );

  ProductCustomOption.associate = (models) => {
    ProductCustomOption.hasMany(models.CustomOption);
  };

  return ProductCustomOption;
};
