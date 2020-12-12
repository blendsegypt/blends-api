'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "uid_provider" to table "Users"
 * addColumn "uid" to table "Users"
 * changeColumn "password_hash" on table "Users"
 * changeColumn "password_salt" on table "Users"
 *
 **/

var info = {
    "revision": 55,
    "name": "remove-User-password-constrains-and-add-third-party-required-fields",
    "created": "2020-12-11T14:12:49.193Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "addColumn",
            params: [
                "Users",
                "uid_provider",
                {
                    "type": Sequelize.ENUM('facebook'),
                    "field": "uid_provider"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "Users",
                "uid",
                {
                    "type": Sequelize.STRING,
                    "field": "uid"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "changeColumn",
            params: [
                "Users",
                "password_hash",
                {
                    "type": Sequelize.STRING,
                    "field": "password_hash"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "changeColumn",
            params: [
                "Users",
                "password_salt",
                {
                    "type": Sequelize.STRING,
                    "field": "password_salt"
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
                "Users",
                "uid_provider",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "Users",
                "uid",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "changeColumn",
            params: [
                "Users",
                "password_hash",
                {
                    "type": Sequelize.STRING,
                    "field": "password_hash",
                    "allowNull": false
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "changeColumn",
            params: [
                "Users",
                "password_salt",
                {
                    "type": Sequelize.STRING,
                    "field": "password_salt",
                    "unique": true,
                    "allowNull": false
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
