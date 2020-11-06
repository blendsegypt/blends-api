module.exports = function (sequelize, DataTypes) {
  const InternalCategory = sequelize.define(
    "InternalCategory",
    {
      // Model attributes are defined here
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Other model options go here
    }
  );

  InternalCategory.associate = (models) => {
    InternalCategory.hasMany(models.ProductCategory, {
      as: "internal_category_id",
      foreignKey: {
        name: "internal_category_id",
        allowNull: false,
      },
      onDelete: "cascade",
    });
    models.ProductCategory.belongsTo(InternalCategory, {
      foreignKey: "internal_category_id",
    });
  };
  return InternalCategory;
};
