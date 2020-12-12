module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define(
    "User",
    {
      // Model attributes are defined here
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
        },
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        default: "null",
        validate: {
          isEmail: true,
        },
      },
      email_verified: {
        type: DataTypes.BOOLEAN,
      },
      gender: {
        type: DataTypes.ENUM("male", "female", "other"),
      },
      dob: {
        type: DataTypes.DATE,
      },
      password_hash: {
        type: DataTypes.STRING,
      },
      password_salt: {
        type: DataTypes.STRING,
      },
      uid_provider: {
        type: DataTypes.ENUM("facebook"),
      },
      uid: {
        type: DataTypes.STRING,
      },
      platform: {
        type: DataTypes.ENUM("ios", "android", "other"),
        allowNull: false,
      },
      referral_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      wallet: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.0,
      },
    },
    {
      // Other model options go here
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Address, {
      as: "addresses",
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
      onDelete: "cascade",
    });
    models.Address.belongsTo(User, { foreignKey: "user_id" });
    User.belongsTo(User, {
      foreignKey: {
        name: "referred_by_id",
        allowNull: true,
      },
    });
  };

  return User;
};
