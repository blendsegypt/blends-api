module.exports = function (sequelize, DataTypes) {
  const WorkingHours = sequelize.define(
    "WorkingHours",
    {
      // Model attributes are defined here
      days: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      opens_at: {
        type: DataTypes.STRING,
      },
      closes_at: {
        type: DataTypes.STRING,
      },
    },
    {
      // Other model options go here
    }
  );

  return WorkingHours;
};
