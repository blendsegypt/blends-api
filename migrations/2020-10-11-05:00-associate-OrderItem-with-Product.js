'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "product_id" to table "OrderItems"
 *
 **/

var info = {
    "revision": 30,
    "name": "associate-OrderItem-with-Product",
    "created": "2020-11-10T11:39:58.336Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
        fn: "addColumn",
        params: [
            "OrderItems",
            "product_id",
            {
                "type": Sequelize.INTEGER,
                "field": "product_id",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Products",
                    "key": "id"
                },
                "allowNull": true
            },
            {
                transaction: transaction
            }
        ]
    }];
};
var rollbackCommands = function(transaction) {
    return [{
        fn: "removeColumn",
        params: [
            "OrderItems",
            "product_id",
            {
                transaction: transaction
            }
        ]
    }];
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
