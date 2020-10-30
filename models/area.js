module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Area', {
        // Model attributes are defined here
        name: {
            type: DataTypes.STRING,
        },
        area_fence: {
            type: DataTypes.ARRAY(DataTypes.DOUBLE),
        }

    }, {
        // Other model options go here
    });

}