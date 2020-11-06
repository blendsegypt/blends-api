module.exports = function (sequelize, DataTypes) {
  const Area = sequelize.define(
    "Area",
    {
      // Model attributes are defined here
      name: {
        type: DataTypes.STRING,
      },
      area_fence: {
        type: DataTypes.ARRAY(DataTypes.DOUBLE),
      },
    },
    {
      // Other model options go here
    }
  );

  Area.associate = (models) => {
    Area.hasMany(models.Address, {
      as: "area_id",
      foreignKey: {
        field: "area_id",
        allowNull: false,
      },
      onDelete: "cascade",
    });
    models.Address.belongsTo(Area);
  };
  return Area;
};
