module.exports = function (sequelize, DataTypes) {
  const PromoCode = sequelize.define(
    "PromoCode",
    {
      // Model attributes are defined here
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
      },
      free_product_quantity: {
        type: DataTypes.INTEGER,
      },
      type: {
        type: DataTypes.ENUM(
          "percentage",
          "fixed",
          "free_delivery",
          "free_item",
          "cashback"
        ),
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
      },
      end_date: {
        type: DataTypes.DATE,
      },
      max_usage_per_user: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      min_order_value: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
      },
      percentage_discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      cashback_amount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
      },
      fixed_amount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
      },
      limited: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      max_usage_per_code: {
        type: DataTypes.INTEGER,
      },
      usage_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      }
    },
    {
      // Other model options go here
    }
  );

  PromoCode.associate = (models) => {
    PromoCode.belongsTo(models.Product, {
      foreignKey: {
        name: "free_product",
      },
    });
    models.Product.hasMany(PromoCode, { foreignKey: "free_product" });
  };

  return PromoCode;
};
