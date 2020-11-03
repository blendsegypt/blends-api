'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "BranchId" to table "WorkingHours"
 *
 **/

var info = {
    "revision": 20,
    "name": "link-Branches-with-WorkingHours",
    "created": "2020-11-02T23:58:06.823Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
        fn: "addColumn",
        params: [
            "WorkingHours",
            "branch_id",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "cascade",
                "references": {
                    "model": "Branches",
                    "key": "id"
                },
                "field": "branch_id",
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
            "WorkingHours",
            "branch_id",
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
