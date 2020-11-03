module.exports = function (sequelize, DataTypes) {
    const Branch = sequelize.define(
        'Branch',
        {
            // Model attributes are defined here
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type: {
                type: DataTypes.ENUM('type1', 'type2', 'type3'),
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM('open', 'closed', 'busy', 'other'),
                allowNull: false,
            },
            max_parallel_orders: {
                type: DataTypes.INTEGER,
            },
        }, {
        // Other model options go here
    });

    Branch.associate = (models) => {
        Branch.hasMany(models.WorkingHours, {
            foreignKey: {
                field: "branch_id",
                allowNull: false,
            },
            onDelete: "cascade",
        });

        //supported Area association
        Branch.belongsToMany(models.Area, { through: "SupportedAreas" });
        models.Area.belongsToMany(Branch, { through: "SupportedAreas" });

    };
    return Branch;
};