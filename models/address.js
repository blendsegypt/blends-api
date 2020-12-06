module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Address",
    {
      // Model attributes are defined here
      verified: {
        type: DataTypes.BOOLEAN,
        default: false,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      governate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      details: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      street: {
        type: DataTypes.STRING,
      },
      building: {
        type: DataTypes.STRING,
      },
      floor: {
        type: DataTypes.STRING,
      },
      flat: {
        type: DataTypes.STRING,
      },
      coordinates: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      driver_notes: {
        type: DataTypes.STRING,
      },
    },
    {
      // Other model options go here
    }
  );
};
