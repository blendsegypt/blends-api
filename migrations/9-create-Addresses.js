'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Adresses", deps: []
 *
 **/

var info = {
    "revision": 9,
    "name": "create-Addresses",
    "created": "2020-10-31T18:30:35.134Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
        fn: "createTable",
        params: [
            "Adresses",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "verified": {
                    "type": Sequelize.BOOLEAN,
                    "field": "verified",
                    "default": false
                },
                "nickname": {
                    "type": Sequelize.STRING,
                    "field": "nickname",
                    "allowNull": false
                },
                "governate": {
                    "type": Sequelize.STRING,
                    "field": "governate",
                    "allowNull": false
                },
                "details": {
                    "type": Sequelize.STRING,
                    "field": "details",
                    "allowNull": false
                },
                "street": {
                    "type": Sequelize.STRING,
                    "field": "street"
                },
                "building": {
                    "type": Sequelize.STRING,
                    "field": "building",
                    "allowNull": false
                },
                "floor": {
                    "type": Sequelize.STRING,
                    "field": "floor"
                },
                "flat": {
                    "type": Sequelize.STRING,
                    "field": "flat"
                },
                "coordinates": {
                    "type": Sequelize.STRING,
                    "field": "coordinates",
                    "allowNull": false
                },
                "driver_notes": {
                    "type": Sequelize.STRING,
                    "field": "driver_notes"
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
        params: ["Adresses", {
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
