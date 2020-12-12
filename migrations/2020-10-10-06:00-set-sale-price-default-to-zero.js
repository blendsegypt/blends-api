"use strict";

var Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * changeColumn "sale_price" on table "Products"
 *
 **/

var info = {
  revision: 11,
  name: "set-sale-price-default-to-zero",
  created: "2020-10-31T18:17:27.314Z",
  comment: "",
};

var migrationCommands = function (transaction) {
  return [
    {
      fn: "changeColumn",
      params: [
        "Products",
        "sale_price",
        {
          type: Sequelize.DOUBLE,
          field: "sale_price",
          default: 0,
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
        "sale_price",
        {
          type: Sequelize.DOUBLE,
          field: "sale_price",
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
