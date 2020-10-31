'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Products", deps: []
 *
 **/

var info = {
    "revision": 5,
    "name": "create-Products-table",
    "created": "2020-10-31T14:31:03.920Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
        fn: "createTable",
        params: [
            "Products",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "order": {
                    "type": Sequelize.INTEGER,
                    "field": "order"
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name",
                    "allowNull": false
                },
                "price": {
                    "type": Sequelize.DOUBLE PRECISION,
                    "field": "price",
                    "allowNull": false
                },
                "sale_price": {
                    "type": Sequelize.DOUBLE PRECISION,
                    "field": "sale_price"
                },
                "description": {
                    "type": Sequelize.STRING,
                    "field": "description"
                },
                "SKU": {
                    "type": Sequelize.STRING,
                    "field": "SKU",
                    "allowNull": false
                },
                "retail": {
                    "type": Sequelize.BOOLEAN,
                    "field": "retail"
                },
                "brand": {
                    "type": Sequelize.STRING,
                    "field": "brand",
                    "default": "Blends"
                },
                "listed": {
                    "type": Sequelize.BOOLEAN,
                    "field": "listed",
                    "allowNull": false
                },
                "quantity_per_box": {
                    "type": Sequelize.INTEGER,
                    "field": "quantity_per_box"
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
        params: ["Products", {
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
