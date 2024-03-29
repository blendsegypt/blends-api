module.exports = function (sequelize, DataTypes) {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      // Model attributes are defined here
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE,
      },
      options: {
        type: DataTypes.STRING,
      },
    },
    {
      // Other model options go here
    }
  );

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, {
      foreignKey: {
        name: "order_id",
        allowNull: false,
      },
      onDelete: "cascade",
    });
    models.Order.hasMany(OrderItem, {
      as: "OrderItems",
      foreignKey: "order_id",
    });
    OrderItem.belongsTo(models.Product, { foreignKey: "product_id" });
  };

  return OrderItem;
};
