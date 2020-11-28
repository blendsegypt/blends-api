module.exports = function (sequelize, DataTypes) {
  const Inventory = sequelize.define(
    "Inventory",
    {
      // Model Attributes are defined here
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      branch_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      branch_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      actual_stock: {
        type: DataTypes.INTEGER,
      },
      safe_stock: {
        type: DataTypes.INTEGER,
      },
      min_stock: {
        type: DataTypes.INTEGER,
      },
    },
    {
      // Other Model options
    }
  );

  Inventory.associate = (models) => {
    Inventory.belongsTo(models.Product, {
      foreignKey: {
        name: "product_id",
        allowNull: false,
      },
      onDelete: "cascade",
    });
    models.Product.hasMany(Inventory, { foreignKey: "product_id" });

    Inventory.belongsTo(models.Branch, {
      foreignKey: {
        name: "branch_id",
        allowNull: false,
      },
      onDelete: "cascade",
    });
    models.Branch.hasMany(Inventory, { foreignKey: "branch_id" });
  };

  return Inventory;
};
