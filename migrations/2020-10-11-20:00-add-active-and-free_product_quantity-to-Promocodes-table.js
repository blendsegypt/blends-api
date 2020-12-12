'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "free_product_quantity" to table "PromoCodes"
 * addColumn "active" to table "PromoCodes"
 *
 **/

var info = {
    "revision": 46,
    "name": "add-active-and-free_product_quantity-to-Promocodes-table",
    "created": "2020-11-16T19:14:35.985Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "addColumn",
            params: [
                "PromoCodes",
                "free_product_quantity",
                {
                    "type": Sequelize.INTEGER,
                    "field": "free_product_quantity"
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
                "active",
                {
                    "type": Sequelize.BOOLEAN,
                    "field": "active"
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
                "free_product_quantity",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "PromoCodes",
                "active",
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
