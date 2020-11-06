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
    ProductCustomOption.hasMany(models.CustomOption, {
      as: "product_custom_option_id",
      foreignKey: {
        field: "product_custom_option_id",
        allowNull: false,
      },
      onDelete: "cascade",
    });
    models.CustomOption.belongsTo(ProductCustomOption);
  };

  return ProductCustomOption;
};
