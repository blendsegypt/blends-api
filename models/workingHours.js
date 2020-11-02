module.exports = function (sequelize, DataTypes) {
    const WorkingHours = sequelize.define(
        'WorkingHours',
        {
            // Model attributes are defined here
            days: {
                type: DataTypes.ARRAY(DataTypes.STRING),
            },
            opens_at: {
                type: DataTypes.DATE, // Discuss
            },
            closes_at: {
                type: DataTypes.DATE,
            }
        }, {
        // Other model options go here
    });

    // WorkingHours.associate = (models) => {
    //     WorkingHours.hasMany(models.WorkingHours, {
    //         foreignKey: {
    //             field: "branch_id",
    //             allowNull: false,
    //         },
    //         onDelete: "cascade",
    //     });
    // };

    return WorkingHours;
};