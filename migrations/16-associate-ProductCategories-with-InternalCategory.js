"use strict";

var Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * addColumn "internalCategoryId" to table "ProductCategories"
 * addColumn "InternalCategoryId" to table "ProductCategories"
 *
 **/

var info = {
  revision: 16,
  name: "associate-ProductCategories-with-InternalCategory",
  created: "2020-11-06T15:06:53.090Z",
  comment: "",
};

var migrationCommands = function (transaction) {
  return [
    {
      fn: "addColumn",
      params: [
        "ProductCategories",
        "internal_category_id",
        {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "cascade",
          references: {
            model: "InternalCategories",
            key: "id",
          },
          field: "internal_category_id",
          allowNull: false,
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
        "internal_category_id",
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
