module.exports = function (sequelize, DataTypes) {
  const ProductCategory = sequelize.define(
    "ProductCategory",
    {
      // Model Attributes are defined here
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Other Model options
    }
  );

  ProductCategory.associate = (models) => {
    ProductCategory.hasMany(models.Product);
  };

  return ProductCategory;
};
