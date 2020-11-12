'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "cashback_percentage" from table "PromoCodes"
 * addColumn "cashback_amount" to table "PromoCodes"
 * addColumn "fixed_amount" to table "PromoCodes"
 *
 **/

var info = {
    "revision": 29,
    "name": "add-fields-to-promoCodes-table",
    "created": "2020-11-10T15:19:50.205Z",
    "comment": ""
};

var migrationCommands = function (transaction) {
    return [{
        fn: "removeColumn",
        params: [
            "PromoCodes",
            "cashback_percentage",
            {
                transaction: transaction
            }
        ]
    },
    {
        fn: "addColumn",
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
        fn: "addColumn",
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
var rollbackCommands = function (transaction) {
    return [{
        fn: "removeColumn",
        params: [
            "PromoCodes",
            "cashback_amount",
            {
                transaction: transaction
            }
        ]
    },
    {
        fn: "removeColumn",
        params: [
            "PromoCodes",
            "fixed_amount",
            {
                transaction: transaction
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "PromoCodes",
            "cashback_percentage",
            {
                "type": Sequelize.DOUBLE,
                "field": "cashback_percentage"
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
