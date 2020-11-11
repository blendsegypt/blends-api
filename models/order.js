module.exports = function (sequelize, DataTypes) {
  const Order = sequelize.define(
    "Order",
    {
      // Model attributes are defined here
      preparing_at: {
        type: DataTypes.DATE,
      },
      delivering_at: {
        type: DataTypes.DATE,
      },
      delivered_at: {
        type: DataTypes.DATE,
      },
      order_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order_status: {
        type: DataTypes.ENUM(
          "Received",
          "Preparing",
          "Delivering",
          "Delivered"
        ),
        allowNull: false,
      },
      delivery_charges: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sub_total: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      total: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      total_after_promo: {
        type: DataTypes.DOUBLE,
      },
      assigned_driver: {
        type: DataTypes.STRING,
      },
    },
    {
      // Other model options go here
    }
  );

  Order.associate = (models) => {
    // Orders belongs to a user
    Order.belongsTo(models.User, {
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
      onDelete: "cascade",
    });
    models.User.hasMany(Order, { foreignKey: "user_id" });
    // Orders belong to an address (delivery address)
    Order.belongsTo(models.Address, {
      foreignKey: {
        name: "delivery_address_id",
      },
    });
    models.Address.hasMany(Order, { foreignKey: "delivery_address_id" });
    // Orders belong to a branch
    Order.belongsTo(models.Branch, {
      foreignKey: {
        name: "branch_id",
        allowNull: false,
      },
      onDelete: "cascade",
    });
    models.Branch.hasMany(Order, { foreignKey: "branch_id" });
    //Orders has one promocode (optional)
    Order.belongsTo(models.PromoCode, {
      foreignKey: {
        name: "promocode_id",
      },
    });
  };

  return Order;
};
