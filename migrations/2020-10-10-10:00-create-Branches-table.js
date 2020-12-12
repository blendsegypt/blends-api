"use strict";

var Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable "Branches", deps: []
 *
 **/

var info = {
  revision: 18,
  name: "create-Branches-table",
  created: "2020-11-02T23:42:09.949Z",
  comment: "",
};

var migrationCommands = function (transaction) {
  return [
    {
      fn: "createTable",
      params: [
        "Branches",
        {
          id: {
            type: Sequelize.INTEGER,
            field: "id",
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
          },
          name: {
            type: Sequelize.STRING,
            field: "name",
            allowNull: false,
          },
          type: {
            type: Sequelize.ENUM("type1", "type2", "type3"),
            field: "type",
            allowNull: false,
          },
          status: {
            type: Sequelize.ENUM("open", "closed", "busy", "under_maintenance"),
            field: "status",
            allowNull: false,
          },
          max_parallel_orders: {
            type: Sequelize.INTEGER,
            field: "max_parallel_orders",
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
        "Branches",
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
