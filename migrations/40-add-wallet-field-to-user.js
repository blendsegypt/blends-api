'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "wallet" to table "Users"
 *
 **/

var info = {
    "revision": 40,
    "name": "add-wallet-field-to-user",
    "created": "2020-11-15T21:06:36.690Z",
    "comment": ""
};

var migrationCommands = function (transaction) {
    return [{
        fn: "addColumn",
        params: [
            "Users",
            "wallet",
            {
                "type": Sequelize.DOUBLE,
                "field": "wallet",
                "defaultValue": 0,
                "allowNull": false
            },
            {
                transaction: transaction
            }
        ]
    }];
};
var rollbackCommands = function (transaction) {
    return [{
        fn: "removeColumn",
        params: [
            "Users",
            "wallet",
            {
                transaction: transaction
            }
        ]
    }];
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
