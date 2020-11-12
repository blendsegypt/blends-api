module.exports = function (sequelize, DataTypes) {
    const UserPromoCode = sequelize.define(
        "UserPromoCode",
        {
            // Model attributes are defined here
            usage: {
                type: DataTypes.INTEGER
            }
        },
    );

    UserPromoCode.associate = (models) => {
        // M:N user:promoode association
        models.User.belongsToMany(models.PromoCode, {
            through: "UserPromoCode",
            foreignKey: "user_id",
        });
        models.PromoCode.belongsToMany(models.User, {
            through: "UserPromoCode",
            foreignKey: "promo_code_id",
        });
    };

    return UserPromoCode;
};
