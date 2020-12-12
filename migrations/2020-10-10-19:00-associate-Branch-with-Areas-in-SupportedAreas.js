'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "SupportedAreas", deps: [Branches, Areas]
 *
 **/

var info = {
    "revision": 20,
    "name": "associate-Branch-with-Areas-in-SupportedAreas",
    "created": "2020-11-06T15:43:26.445Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
        fn: "createTable",
        params: [
            "SupportedAreas",
            {
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
                "branch_id": {
                    "type": Sequelize.INTEGER,
                    "field": "branch_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Branches",
                        "key": "id"
                    },
                    "primaryKey": true
                },
                "area_id": {
                    "type": Sequelize.INTEGER,
                    "field": "area_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Areas",
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
        params: ["SupportedAreas", {
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
