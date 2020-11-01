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
    ProductTag.belongsToMany(models.Product, { through: "Products_Tags" });
    models.Product.belongsToMany(ProductTag, { through: "Products_Tags" });
  };

  return ProductTag;
};
