module.exports = function (sequelize, DataTypes) {
  const Product = sequelize.define(
    "Product",
    {
      // Model attributes are defined here
      order: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      sale_price: {
        type: DataTypes.DOUBLE,
      },
      description: {
        type: DataTypes.STRING,
      },
      SKU: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      retail: {
        type: DataTypes.BOOLEAN,
      },
      brand: {
        type: DataTypes.STRING,
        default: "Blends",
      },
      listed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      quantity_per_box: {
        type: DataTypes.INTEGER,
      },
    },
    {
      // Other model options go here
    }
  );

  return Product;
};
