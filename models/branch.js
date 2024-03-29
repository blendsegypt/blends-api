module.exports = function (sequelize, DataTypes) {
  const Branch = sequelize.define(
    "Branch",
    {
      // Model attributes are defined here
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
      },
      type: {
        type: DataTypes.ENUM("type1", "type2", "type3"),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("open", "closed", "busy", "under_maintenance"),
        allowNull: false,
      },
      max_parallel_orders: {
        type: DataTypes.INTEGER,
      },
      busy_threshold: {
        type: DataTypes.INTEGER,
      },
    },
    {
      // Other model options go here
    }
  );

  Branch.associate = (models) => {
    Branch.hasMany(models.WorkingHours, {
      as: "working_hours",
      foreignKey: {
        name: "branch_id",
        allowNull: false,
      },
      onDelete: "cascade",
    });
    models.WorkingHours.belongsTo(Branch, { foreignKey: "branch_id" });

    //supported Area association
    Branch.belongsToMany(models.Area, {
      through: "SupportedAreas",
      foreignKey: "branch_id",
    });
    models.Area.belongsToMany(Branch, {
      through: "SupportedAreas",
      foreignKey: "area_id",
    });
  };
  return Branch;
};
