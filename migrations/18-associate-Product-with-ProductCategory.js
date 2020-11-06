"use strict";

var Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * changeColumn "ProductCategoryId" on table "Products"
 * changeColumn "ProductCategoryId" on table "Products"
 *
 **/

var info = {
  revision: 18,
  name: "associate-Product-with-ProductCategory",
  created: "2020-11-05T16:08:39.573Z",
  comment: "",
};

var migrationCommands = function (transaction) {
  return [
    {
      fn: "changeColumn",
      params: [
        "Products",
        "product_category",
        {
          type: Sequelize.INTEGER,
          field: "product_category",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: {
            model: "ProductCategories",
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
      fn: "changeColumn",
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
