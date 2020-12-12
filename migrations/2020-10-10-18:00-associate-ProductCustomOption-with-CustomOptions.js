"use strict";

var Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * removeColumn "product_category" from table "Products"
 * addColumn "ProductCustomOptionId" to table "CustomOptions"
 * addColumn "ProductCategoryId" to table "Products"
 *
 **/

var info = {
  revision: 19,
  name: "associate-ProductCustomOption-with-CustomOptions",
  created: "2020-11-06T15:28:08.180Z",
  comment: "",
};

var migrationCommands = function (transaction) {
  return [
    {
      fn: "addColumn",
      params: [
        "CustomOptions",
        "product_custom_option_id",
        {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "cascade",
          references: {
            model: "ProductCustomOptions",
            key: "id",
          },
          field: "product_custom_option_id",
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
        "CustomOptions",
        "product_custom_option_id",
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
