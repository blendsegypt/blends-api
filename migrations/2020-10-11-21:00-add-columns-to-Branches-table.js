"use strict";

var Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * addColumn "active" to table "Branches"
 * addColumn "busy_threshold" to table "Branches"
 * changeColumn "status" on table "Branches"
 *
 **/

var info = {
  revision: 44,
  name: "add-columns-to-Branches-table",
  created: "2020-11-16T17:26:07.946Z",
  comment: "",
};

var migrationCommands = function (transaction) {
  return [
    {
      fn: "addColumn",
      params: [
        "Branches",
        "active",
        {
          type: Sequelize.BOOLEAN,
          field: "active",
        },
        {
          transaction: transaction,
        },
      ],
    },
    {
      fn: "addColumn",
      params: [
        "Branches",
        "busy_threshold",
        {
          type: Sequelize.INTEGER,
          field: "busy_threshold",
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
      fn: "removeColumn",
      params: [
        "Branches",
        "active",
        {
          transaction: transaction,
        },
      ],
    },
    {
      fn: "removeColumn",
      params: [
        "Branches",
        "busy_threshold",
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
