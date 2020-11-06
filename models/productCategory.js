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
    ProductCategory.hasMany(models.Product, {
      as: "product_category_id",
      foreignKey: {
        name: "product_category_id",
        allowNull: false,
      },
      onDelete: "cascade",
    });
    models.Product.belongsTo(ProductCategory, {
      foreignKey: "product_category_id",
    });
  };
  return ProductCategory;
};
