'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "UserId" to table "Addresses"
 *
 **/

var info = {
    "revision": 13,
    "name": "associate-Address-with-User",
    "created": "2020-11-06T14:43:32.514Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
        fn: "addColumn",
        params: [
            "Addresses",
            "user_id",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "cascade",
                "references": {
                    "model": "Users",
                    "key": "id"
                },
                "field": "user_id",
                "allowNull": false
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
            "Addresses",
            "user_id",
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
