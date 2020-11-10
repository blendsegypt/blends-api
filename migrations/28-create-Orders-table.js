"use strict";

var Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable "Orders", deps: [Users, Branches]
 *
 **/

var info = {
  revision: 28,
  name: "create-Orders-table",
  created: "2020-11-10T11:26:01.925Z",
  comment: "",
};

var migrationCommands = function (transaction) {
  return [
    {
      fn: "createTable",
      params: [
        "Orders",
        {
          id: {
            type: Sequelize.INTEGER,
            field: "id",
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
          },
          preparing_at: {
            type: Sequelize.DATE,
            field: "preparing_at",
          },
          delivering_at: {
            type: Sequelize.DATE,
            field: "delivering_at",
          },
          delivered_at: {
            type: Sequelize.DATE,
            field: "delivered_at",
          },
          order_number: {
            type: Sequelize.INTEGER,
            field: "order_number",
            allowNull: false,
          },
          order_status: {
            type: Sequelize.ENUM(
              "Received",
              "Preparing",
              "Delivering",
              "Delivered"
            ),
            field: "order_status",
            allowNull: false,
          },
          delivery_charges: {
            type: Sequelize.INTEGER,
            field: "delivery_charges",
            allowNull: false,
          },
          sub_total: {
            type: Sequelize.DOUBLE,
            field: "sub_total",
            allowNull: false,
          },
          total: {
            type: Sequelize.DOUBLE,
            field: "total",
            allowNull: false,
          },
          total_after_promo: {
            type: Sequelize.DOUBLE,
            field: "total_after_promo",
          },
          assigned_driver: {
            type: Sequelize.STRING,
            field: "assigned_driver",
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
          user_id: {
            type: Sequelize.INTEGER,
            field: "user_id",
            onUpdate: "CASCADE",
            onDelete: "cascade",
            references: {
              model: "Users",
              key: "id",
            },
            name: "user_id",
            allowNull: false,
          },
          branch_id: {
            type: Sequelize.INTEGER,
            field: "branch_id",
            onUpdate: "CASCADE",
            onDelete: "cascade",
            references: {
              model: "Branches",
              key: "id",
            },
            name: "branch_id",
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
        "Orders",
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
