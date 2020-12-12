'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Shipments", deps: [Products, Branches]
 *
 **/

var info = {
    "revision": 25,
    "name": "create-Shipment-table",
    "created": "2020-11-09T13:06:42.712Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
        fn: "createTable",
        params: [
            "Shipments",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "remaining_quantity": {
                    "type": Sequelize.INTEGER,
                    "field": "remaining_quantity",
                    "allowNull": false
                },
                "purchased_quantity": {
                    "type": Sequelize.INTEGER,
                    "field": "purchased_quantity",
                    "allowNull": false
                },
                "expiry_date": {
                    "type": Sequelize.DATE,
                    "field": "expiry_date"
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
                "product_id": {
                    "type": Sequelize.INTEGER,
                    "field": "product_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "Products",
                        "key": "id"
                    },
                    "name": "product_id",
                    "allowNull": false
                },
                "branch_id": {
                    "type": Sequelize.INTEGER,
                    "field": "branch_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "Branches",
                        "key": "id"
                    },
                    "name": "branch_id",
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
        params: ["Shipments", {
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
