"use strict";

var Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable "Areas", deps: []
 *
 **/

var info = {
  revision: 2,
  name: "create-Area-table",
  created: "2020-10-30T17:32:38.211Z",
  comment: "",
};

var migrationCommands = function (transaction) {
  return [
    {
      fn: "createTable",
      params: [
        "Areas",
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
          },
          area_fence: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            field: "area_fence",
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
        "Areas",
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
