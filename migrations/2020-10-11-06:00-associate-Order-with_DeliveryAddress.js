'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "delivery_address_id" to table "Orders"
 *
 **/

var info = {
    "revision": 31,
    "name": "associate-Order-with_DeliveryAddress",
    "created": "2020-11-10T12:20:14.881Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
        fn: "addColumn",
        params: [
            "Orders",
            "delivery_address_id",
            {
                "type": Sequelize.INTEGER,
                "field": "delivery_address_id",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Addresses",
                    "key": "id"
                },
                "name": "delivery_address_id",
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
            "Orders",
            "delivery_address_id",
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
