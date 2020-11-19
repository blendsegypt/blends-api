module.exports = function (sequelize, DataTypes) {
  const Banner = sequelize.define(
    "Banner",
    {
      // Model attributes are defined here
      description: {
        type: DataTypes.STRING,
      },
      product_id: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      banner_image_url: {
        type: DataTypes.STRING,
      },
    },
    {
      // Other model options go here
    }
  );
  return Banner;
};
