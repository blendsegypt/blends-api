"use strict";

var Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * addColumn "InternalCategoryId" to table "ProductCategories"
 *
 **/

var info = {
  revision: 6,
  name: "link-InternalCategories-with-ProductCategories",
  created: "2020-10-31T12:37:04.761Z",
  comment: "",
};

var migrationCommands = function (transaction) {
  return [
    {
      fn: "addColumn",
      params: [
        "ProductCategories",
        "InternalCategoryId",
        {
          type: Sequelize.INTEGER,
          field: "InternalCategoryId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: {
            model: "InternalCategories",
            key: "id",
          },
          allowNull: true,
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
        "ProductCategories",
        "InternalCategoryId",
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
