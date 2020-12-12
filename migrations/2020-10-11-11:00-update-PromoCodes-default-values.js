'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "max_usage_per_user" on table "PromoCodes"
 * changeColumn "min_order_value" on table "PromoCodes"
 * changeColumn "percentage_discount" on table "PromoCodes"
 * changeColumn "cashback_amount" on table "PromoCodes"
 * changeColumn "fixed_amount" on table "PromoCodes"
 *
 **/

var info = {
    "revision": 30,
    "name": "noname",
    "created": "2020-11-10T16:27:21.852Z",
    "comment": ""
};

var migrationCommands = function (transaction) {
    return [{
        fn: "changeColumn",
        params: [
            "PromoCodes",
            "max_usage_per_user",
            {
                "type": Sequelize.INTEGER,
                "field": "max_usage_per_user",
                "defaultValue": 1
            },
            {
                transaction: transaction
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "PromoCodes",
            "min_order_value",
            {
                "type": Sequelize.DOUBLE,
                "field": "min_order_value",
                "defaultValue": 0
            },
            {
                transaction: transaction
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "PromoCodes",
            "percentage_discount",
            {
                "type": Sequelize.INTEGER,
                "field": "percentage_discount",
                "defaultValue": 0
            },
            {
                transaction: transaction
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "PromoCodes",
            "cashback_amount",
            {
                "type": Sequelize.DOUBLE,
                "field": "cashback_amount",
                "defaultValue": 0
            },
            {
                transaction: transaction
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "PromoCodes",
            "fixed_amount",
            {
                "type": Sequelize.DOUBLE,
                "field": "fixed_amount",
                "defaultValue": 0
            },
            {
                transaction: transaction
            }
        ]
    }
    ];
};
var rollbackCommands = function (transaction) {
    return [{
        fn: "changeColumn",
        params: [
            "PromoCodes",
            "max_usage_per_user",
            {
                "type": Sequelize.INTEGER,
                "field": "max_usage_per_user"
            },
            {
                transaction: transaction
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "PromoCodes",
            "min_order_value",
            {
                "type": Sequelize.DOUBLE,
                "field": "min_order_value"
            },
            {
                transaction: transaction
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "PromoCodes",
            "percentage_discount",
            {
                "type": Sequelize.INTEGER,
                "field": "percentage_discount"
            },
            {
                transaction: transaction
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "PromoCodes",
            "cashback_amount",
            {
                "type": Sequelize.DOUBLE,
                "field": "cashback_amount"
            },
            {
                transaction: transaction
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "PromoCodes",
            "fixed_amount",
            {
                "type": Sequelize.DOUBLE,
                "field": "fixed_amount"
            },
            {
                transaction: transaction
            }
        ]
    }
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
                        queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                    }
                    else
                        resolve();
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
    info: info
};
