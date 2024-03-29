'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "free_product" on table "PromoCodes"
 * changeColumn "free_product" on table "PromoCodes"
 * changeColumn "free_product" on table "PromoCodes"
 *
 **/

var info = {
    "revision": 40,
    "name": "associate-Promocode-with-Product",
    "created": "2020-11-15T14:30:48.310Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "changeColumn",
            params: [
                "PromoCodes",
                "free_product",
                {
                    "type": Sequelize.INTEGER,
                    "field": "free_product",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Products",
                        "key": "id"
                    },
                    "name": "free_product",
                    "allowNull": true
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
                "free_product",
                {
                    "type": Sequelize.INTEGER,
                    "field": "free_product",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Products",
                        "key": "id"
                    },
                    "name": "free_product",
                    "allowNull": true
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
                "free_product",
                {
                    "type": Sequelize.INTEGER,
                    "field": "free_product",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Products",
                        "key": "id"
                    },
                    "name": "free_product",
                    "allowNull": true
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
            fn: "changeColumn",
            params: [
                "PromoCodes",
                "free_product",
                {
                    "type": Sequelize.INTEGER,
                    "field": "free_product"
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
                "free_product",
                {
                    "type": Sequelize.INTEGER,
                    "field": "free_product"
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
                "free_product",
                {
                    "type": Sequelize.INTEGER,
                    "field": "free_product"
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
