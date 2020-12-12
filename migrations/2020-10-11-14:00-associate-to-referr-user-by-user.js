'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "referred_by_id" to table "Users"
 *
 **/

var info = {
    "revision": 39,
    "name": "associate-to-referr-user-by-user",
    "created": "2020-11-13T16:23:20.373Z",
    "comment": ""
};

var migrationCommands = function (transaction) {
    return [{
        fn: "addColumn",
        params: [
            "Users",
            "referred_by_id",
            {
                "type": Sequelize.INTEGER,
                "field": "referred_by_id",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Users",
                    "key": "id"
                },
                "name": "referred_by_id",
                "allowNull": true
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
            "referred_by_id",
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
