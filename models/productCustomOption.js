module.exports = function (sequelize, DataTypes) {
  const ProductCustomOption = sequelize.define("ProductCustomOption", {
    label: {
      type: DataTypes.STRING,
    },
    icon: {
      type: DataTypes.STRING,
    },
    mandatory: {
      type: DataTypes.BOOLEAN,
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
  });

  return ProductCustomOption;
};
