module.exports = function (sequelize, DataTypes) {
  return sequelize.define('User', {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
    },
    gender: {
      type: DataTypes.ENUM('Male', 'Female', 'Prefer not to tell'),
    },
    dob: {
      type: DataTypes.DATE
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password_salt: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    platform: {
      type: DataTypes.ENUM('ios', 'android', 'other'),
      allowNull: false,
    }
  }, {
    // Other model options go here
  });

}