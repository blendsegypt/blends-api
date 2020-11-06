module.exports = function (sequelize, DataTypes) {
  const ProductTag = sequelize.define("ProductTag", {
    label: {
      type: DataTypes.STRING,
    },
    color: {
      type: DataTypes.STRING,
    },
  });

  ProductTag.associate = (models) => {
    ProductTag.belongsToMany(models.Product, {
      as: "product_tag",
      through: "ProductsTags",
      foreignKey: "product_tag_id",
    });
    models.Product.belongsToMany(ProductTag, {
      as: "product",
      through: "ProductsTags",
      foreignKey: "product_id",
    });
  };

  return ProductTag;
};
