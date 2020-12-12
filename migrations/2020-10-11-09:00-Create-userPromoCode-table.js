'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "UserPromoCodes", deps: [Users, PromoCodes]
 *
 **/

var info = {
    "revision": 28,
    "name": "Create-userPromoCode-table",
    "created": "2020-11-10T01:26:05.057Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
        fn: "createTable",
        params: [
            "UserPromoCodes",
            {
                "usage": {
                    "type": Sequelize.INTEGER,
                    "field": "usage"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "user_id": {
                    "type": Sequelize.INTEGER,
                    "field": "user_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "primaryKey": true
                },
                "promo_code_id": {
                    "type": Sequelize.INTEGER,
                    "field": "promo_code_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "PromoCodes",
                        "key": "id"
                    },
                    "primaryKey": true
                }
            },
            {
                "transaction": transaction
            }
        ]
    }];
};
var rollbackCommands = function(transaction) {
    return [{
        fn: "dropTable",
        params: ["UserPromoCodes", {
            transaction: transaction
        }]
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
