module.exports = function (sequelize, DataTypes) {
    const PromoCode = sequelize.define(
        'PromoCode',
        {
            // Model attributes are defined here
            code: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            type: {
                type: DataTypes.ENUM("percentage", "fixed", "free_delivery", "free_item", "cashback"),
                allowNull: false,
            },
            start_date: {
                type: DataTypes.DATE,
            },
            end_date: {
                type: DataTypes.DATE,
            },
            max_usage_per_user: {
                type: DataTypes.INTEGER,
            },
            min_order_value: {
                type: DataTypes.DOUBLE,
            },
            percentage_discount: {
                type: DataTypes.INTEGER,
            },
            free_product: { // product_id
                type: DataTypes.INTEGER,
            },
            cashback_percentage: {
                type: DataTypes.DOUBLE,
            }
        }, {
        // Other model options go here
    });

    return PromoCode;
};