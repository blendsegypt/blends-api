"use strict";

var Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * addColumn "ProductCategoryId" to table "Products"
 *
 **/

var info = {
  revision: 10,
  name: "link-Product-with-ProductCategory",
  created: "2020-10-31T15:27:19.291Z",
  comment: "",
};

var migrationCommands = function (transaction) {
  return [
    {
      fn: "addColumn",
      params: [
        "Products",
        "product_category",
        {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "cascade",
          references: {
            model: "ProductCategories",
            key: "id",
          },
          field: "product_category",
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
        "Products",
        "product_category",
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
