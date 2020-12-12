'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "limited" to table "PromoCodes"
 * addColumn "max_usage_per_code" to table "PromoCodes"
 * addColumn "usage_count" to table "PromoCodes"
 *
 **/

var info = {
    "revision": 50,
    "name": "add-coloumns-to-PromoCodes",
    "created": "2020-11-21T00:06:21.689Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "addColumn",
            params: [
                "PromoCodes",
                "limited",
                {
                    "type": Sequelize.BOOLEAN,
                    "field": "limited",
                    "defaultValue": false
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
                "max_usage_per_code",
                {
                    "type": Sequelize.INTEGER,
                    "field": "max_usage_per_code"
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
                "usage_count",
                {
                    "type": Sequelize.INTEGER,
                    "field": "usage_count",
                    "defaultValue": 0
                },
                {
                    transaction: transaction
                }
            ]
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "removeColumn",
            params: [
                "PromoCodes",
                "limited",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "PromoCodes",
                "max_usage_per_code",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "PromoCodes",
                "usage_count",
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
    execute: function(queryInterface, Sequelize, _commands)
    {
        var index = this.pos;
        function run(transaction) {
            const commands = _commands(transaction);
            return new Promise(function(resolve, reject) {
                function next() {
                    if (index < commands.length)
                    {
                        let command = commands[index];
                        console.log("[#"+index+"] execute: " + command.fn);
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
    up: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, migrationCommands);
    },
    down: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, rollbackCommands);
    },
    info: info
};
