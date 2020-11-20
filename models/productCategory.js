module.exports = function (sequelize, DataTypes) {
  const ProductCategory = sequelize.define(
    "ProductCategory",
    {
      // Model Attributes are defined here
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      // Other Model options
    }
  );

  ProductCategory.associate = (models) => {
    ProductCategory.hasMany(models.Product, {
      foreignKey: {
        name: "product_category_id",
        allowNull: false,
      },
      onDelete: "cascade",
    });
    models.Product.belongsTo(ProductCategory, {
      as: "product_category",
      foreignKey: "product_category_id",
    });
  };
  return ProductCategory;
};
