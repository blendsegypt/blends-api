"use strict";

var Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable "Users", deps: []
 *
 **/

var info = {
  revision: 1,
  name: "create-Users-table",
  created: "2020-10-29T14:30:22.288Z",
  comment: "",
};

var migrationCommands = function (transaction) {
  return [
    {
      fn: "createTable",
      params: [
        "Users",
        {
          id: {
            type: Sequelize.INTEGER,
            field: "id",
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
          },
          first_name: {
            type: Sequelize.STRING,
            field: "first_name",
            allowNull: false,
          },
          last_name: {
            type: Sequelize.STRING,
            field: "last_name",
            allowNull: false,
          },
          phone_number: {
            type: Sequelize.STRING,
            field: "phone_number",
            unique: true,
            allowNull: false,
          },
          email: {
            type: Sequelize.STRING,
            field: "email",
            default: "null",
            unique: true,
          },
          email_verified: {
            type: Sequelize.BOOLEAN,
            field: "email_verified",
          },
          gender: {
            type: Sequelize.ENUM("male", "female", "other"),
            field: "gender",
          },
          dob: {
            type: Sequelize.DATE,
            field: "dob",
          },
          password_hash: {
            type: Sequelize.STRING,
            field: "password_hash",
            allowNull: false,
          },
          password_salt: {
            type: Sequelize.STRING,
            field: "password_salt",
            unique: true,
            allowNull: false,
          },
          platform: {
            type: Sequelize.ENUM("ios", "android", "other"),
            field: "platform",
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            field: "createdAt",
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            field: "updatedAt",
            allowNull: false,
          },
        },
        {
          transaction: transaction,
        },
      ],
    },
  ];
};
var rollbackCommands = function (transaction) {
  return [
    {
      fn: "dropTable",
      params: [
        "Users",
        {
          transaction: transaction,
        },
      ],
    },
  ];
};

module.exports = {
  pos: 0,
  useTransaction: true,
  execute: function (queryInterface, Sequelize, _commands) {
    var index = this.pos;
    function run(transaction) {
      const commands = _commands(transaction);
      return new Promise(function (resolve, reject) {
        function next() {
          if (index < commands.length) {
            let command = commands[index];
            console.log("[#" + index + "] execute: " + command.fn);
            index++;
            queryInterface[command.fn]
              .apply(queryInterface, command.params)
              .then(next, reject);
          } else resolve();
        }
        next();
      });
    }
    if (this.useTransaction) {
      return queryInterface.sequelize.transaction(run);
    } else {
      return run(null);
    }
  },
  up: function (queryInterface, Sequelize) {
    return this.execute(queryInterface, Sequelize, migrationCommands);
  },
  down: function (queryInterface, Sequelize) {
    return this.execute(queryInterface, Sequelize, rollbackCommands);
  },
  info: info,
};
