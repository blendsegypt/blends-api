module.exports = function (sequelize, DataTypes) {
  const Shipment = sequelize.define(
    "Shipment",
    {
      // Model attributes are defined here
      remaining_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      purchased_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      expiry_date: {
        type: DataTypes.DATE,
      },
    },
    {
      // Other model options go here
    }
  );
  Shipment.associate = (models) => {
    Shipment.belongsTo(models.Product, {
      foreignKey: {
        name: "product_id",
        allowNull: false,
      },
      onDelete: "cascade",
    });
    models.Product.hasMany(Shipment, { foreignKey: "product_id" });
    Shipment.belongsTo(models.Branch, {
      foreignKey: {
        name: "branch_id",
        allowNull: false,
      },
      onDelete: "cascade",
    });
    models.Branch.hasMany(Shipment, { foreignKey: "branch_id" });
  };
  return Shipment;
};
