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
    InternalCategory.hasMany(models.ProductCategory);
  };
  return InternalCategory;
};
