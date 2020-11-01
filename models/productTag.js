module.exports = function (sequelize, DataTypes) {
  const ProductTag = sequelize.define("ProductTag", {
    label: {
      type: DataTypes.STRING,
    },
    color: {
      type: DataTypes.STRING,
    },
  });

  return ProductTag;
};
