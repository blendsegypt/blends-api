'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "OTPs", deps: []
 * createTable "Admins", deps: []
 * createTable "Areas", deps: []
 * createTable "Banners", deps: []
 * createTable "Branches", deps: []
 * createTable "InternalCategories", deps: []
 * createTable "ProductTags", deps: []
 * createTable "RefreshTokens", deps: []
 * createTable "ProductCategories", deps: [InternalCategories]
 * createTable "Users", deps: [Users]
 * createTable "Products", deps: [ProductCategories]
 * createTable "ProductCustomOptions", deps: [Products]
 * createTable "PromoCodes", deps: [Products]
 * createTable "Inventories", deps: [Products, Branches]
 * createTable "Addresses", deps: [Areas, Users]
 * createTable "CustomOptions", deps: [ProductCustomOptions]
 * createTable "Orders", deps: [Users, Addresses, Branches, PromoCodes]
 * createTable "Shipments", deps: [Products, Branches]
 * createTable "OrderItems", deps: [Orders, Products]
 * createTable "UserPromoCodes", deps: [Users, PromoCodes]
 * createTable "WorkingHours", deps: [Branches]
 * createTable "SupportedAreas", deps: [Branches, Areas]
 * createTable "ProductsTags", deps: [ProductTags, Products]
 *
 **/

var info = {
    "timestamp": "2020-12-12-18:51",
    "name": "noname",
    "created": "2020-12-12T16:51:38.628Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "OTPs",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "phone_number": {
                    "type": Sequelize.STRING,
                    "field": "phone_number",
                    "allowNull": false
                },
                "OTP": {
                    "type": Sequelize.STRING,
                    "field": "OTP",
                    "allowNull": false
                },
                "verified": {
                    "type": Sequelize.BOOLEAN,
                    "field": "verified",
                    "defaultValue": false
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
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Admins",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name",
                    "allowNull": false
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "allowNull": false
                },
                "password_hash": {
                    "type": Sequelize.STRING,
                    "field": "password_hash",
                    "allowNull": false
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
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Areas",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name"
                },
                "area_fence": {
                    "type": Sequelize.ARRAY(Sequelize.STRING),
                    "field": "area_fence"
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
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Banners",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "description": {
                    "type": Sequelize.STRING,
                    "field": "description"
                },
                "product_id": {
                    "type": Sequelize.INTEGER,
                    "field": "product_id"
                },
                "banner_image_url": {
                    "type": Sequelize.STRING,
                    "field": "banner_image_url"
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
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Branches",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name",
                    "allowNull": false
                },
                "active": {
                    "type": Sequelize.BOOLEAN,
                    "field": "active"
                },
                "type": {
                    "type": Sequelize.ENUM('type1', 'type2', 'type3'),
                    "field": "type",
                    "allowNull": false
                },
                "status": {
                    "type": Sequelize.ENUM('open', 'closed', 'busy', 'under_maintenance'),
                    "field": "status",
                    "allowNull": false
                },
                "max_parallel_orders": {
                    "type": Sequelize.INTEGER,
                    "field": "max_parallel_orders"
                },
                "busy_threshold": {
                    "type": Sequelize.INTEGER,
                    "field": "busy_threshold"
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
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "InternalCategories",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name",
                    "allowNull": false
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
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "ProductTags",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "label": {
                    "type": Sequelize.STRING,
                    "field": "label"
                },
                "color": {
                    "type": Sequelize.STRING,
                    "field": "color"
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
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "RefreshTokens",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "user_id": {
                    "type": Sequelize.INTEGER,
                    "field": "user_id",
                    "allowNull": false
                },
                "token": {
                    "type": Sequelize.STRING,
                    "field": "token",
                    "allowNull": false
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
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "ProductCategories",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name",
                    "allowNull": false
                },
                "active": {
                    "type": Sequelize.BOOLEAN,
                    "field": "active"
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
                "internal_category_id": {
                    "type": Sequelize.INTEGER,
                    "field": "internal_category_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "InternalCategories",
                        "key": "id"
                    },
                    "name": "internal_category_id",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Users",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "first_name": {
                    "type": Sequelize.STRING,
                    "field": "first_name",
                    "validate": {
                        "isAlpha": true
                    },
                    "allowNull": false
                },
                "last_name": {
                    "type": Sequelize.STRING,
                    "field": "last_name",
                    "validate": {
                        "isAlpha": true
                    },
                    "allowNull": false
                },
                "phone_number": {
                    "type": Sequelize.STRING,
                    "field": "phone_number",
                    "unique": true,
                    "allowNull": false
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "validate": {
                        "isEmail": true
                    },
                    "default": "null",
                    "unique": true
                },
                "email_verified": {
                    "type": Sequelize.BOOLEAN,
                    "field": "email_verified"
                },
                "gender": {
                    "type": Sequelize.ENUM('male', 'female', 'other'),
                    "field": "gender"
                },
                "dob": {
                    "type": Sequelize.DATE,
                    "field": "dob"
                },
                "password_hash": {
                    "type": Sequelize.STRING,
                    "field": "password_hash"
                },
                "password_salt": {
                    "type": Sequelize.STRING,
                    "field": "password_salt"
                },
                "uid_provider": {
                    "type": Sequelize.ENUM('facebook'),
                    "field": "uid_provider"
                },
                "uid": {
                    "type": Sequelize.STRING,
                    "field": "uid"
                },
                "platform": {
                    "type": Sequelize.ENUM('ios', 'android', 'other'),
                    "field": "platform",
                    "allowNull": false
                },
                "referral_code": {
                    "type": Sequelize.STRING,
                    "field": "referral_code",
                    "unique": true,
                    "allowNull": false
                },
                "wallet": {
                    "type": Sequelize.DOUBLE PRECISION,
                    "field": "wallet",
                    "defaultValue": 0,
                    "allowNull": false
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
                "referred_by_id": {
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
                }
            },
            {}
        ]
    },
    {
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
                "product_image_url": {
                    "type": Sequelize.STRING,
                    "field": "product_image_url"
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
                    "field": "sale_price",
                    "default": 0
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
                },
                "product_category_id": {
                    "type": Sequelize.INTEGER,
                    "field": "product_category_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "ProductCategories",
                        "key": "id"
                    },
                    "name": "product_category_id",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "ProductCustomOptions",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "label": {
                    "type": Sequelize.STRING,
                    "field": "label"
                },
                "icon": {
                    "type": Sequelize.STRING,
                    "field": "icon"
                },
                "mandatory": {
                    "type": Sequelize.BOOLEAN,
                    "field": "mandatory"
                },
                "active": {
                    "type": Sequelize.BOOLEAN,
                    "field": "active"
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
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Products",
                        "key": "id"
                    },
                    "name": "product_id",
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "PromoCodes",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "code": {
                    "type": Sequelize.STRING,
                    "field": "code",
                    "unique": true,
                    "allowNull": false
                },
                "active": {
                    "type": Sequelize.BOOLEAN,
                    "field": "active"
                },
                "free_product_quantity": {
                    "type": Sequelize.INTEGER,
                    "field": "free_product_quantity"
                },
                "type": {
                    "type": Sequelize.ENUM('percentage', 'fixed', 'free_delivery', 'free_item', 'cashback'),
                    "field": "type",
                    "allowNull": false
                },
                "start_date": {
                    "type": Sequelize.DATE,
                    "field": "start_date"
                },
                "end_date": {
                    "type": Sequelize.DATE,
                    "field": "end_date"
                },
                "max_usage_per_user": {
                    "type": Sequelize.INTEGER,
                    "field": "max_usage_per_user",
                    "defaultValue": 1
                },
                "min_order_value": {
                    "type": Sequelize.DOUBLE PRECISION,
                    "field": "min_order_value",
                    "defaultValue": 0
                },
                "percentage_discount": {
                    "type": Sequelize.INTEGER,
                    "field": "percentage_discount",
                    "defaultValue": 0
                },
                "cashback_amount": {
                    "type": Sequelize.DOUBLE PRECISION,
                    "field": "cashback_amount",
                    "defaultValue": 0
                },
                "fixed_amount": {
                    "type": Sequelize.DOUBLE PRECISION,
                    "field": "fixed_amount",
                    "defaultValue": 0
                },
                "limited": {
                    "type": Sequelize.BOOLEAN,
                    "field": "limited",
                    "defaultValue": false
                },
                "max_usage_per_code": {
                    "type": Sequelize.INTEGER,
                    "field": "max_usage_per_code"
                },
                "usage_count": {
                    "type": Sequelize.INTEGER,
                    "field": "usage_count",
                    "defaultValue": 0
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
                "free_product": {
                    "type": Sequelize.INTEGER,
                    "field": "free_product",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Products",
                        "key": "id"
                    },
                    "name": "free_product",
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Inventories",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "product_id": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "Products",
                        "key": "id"
                    },
                    "name": "product_id",
                    "field": "product_id",
                    "allowNull": false
                },
                "branch_id": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "Branches",
                        "key": "id"
                    },
                    "name": "branch_id",
                    "field": "branch_id",
                    "allowNull": false
                },
                "branch_name": {
                    "type": Sequelize.STRING,
                    "field": "branch_name",
                    "allowNull": false
                },
                "product_name": {
                    "type": Sequelize.STRING,
                    "field": "product_name",
                    "allowNull": false
                },
                "actual_stock": {
                    "type": Sequelize.INTEGER,
                    "field": "actual_stock"
                },
                "safe_stock": {
                    "type": Sequelize.INTEGER,
                    "field": "safe_stock"
                },
                "min_stock": {
                    "type": Sequelize.INTEGER,
                    "field": "min_stock"
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
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Addresses",
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
                    "field": "building"
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
                },
                "area_id": {
                    "type": Sequelize.INTEGER,
                    "field": "area_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "Areas",
                        "key": "id"
                    },
                    "name": "area_id",
                    "allowNull": false
                },
                "user_id": {
                    "type": Sequelize.INTEGER,
                    "field": "user_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "name": "user_id",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "CustomOptions",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "label": {
                    "type": Sequelize.STRING,
                    "field": "label"
                },
                "price": {
                    "type": Sequelize.DOUBLE PRECISION,
                    "field": "price"
                },
                "value": {
                    "type": Sequelize.STRING,
                    "field": "value"
                },
                "active": {
                    "type": Sequelize.BOOLEAN,
                    "field": "active"
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
                "product_custom_option_id": {
                    "type": Sequelize.INTEGER,
                    "field": "product_custom_option_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "ProductCustomOptions",
                        "key": "id"
                    },
                    "name": "product_custom_option_id",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Orders",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "preparing_at": {
                    "type": Sequelize.DATE,
                    "field": "preparing_at"
                },
                "delivering_at": {
                    "type": Sequelize.DATE,
                    "field": "delivering_at"
                },
                "delivered_at": {
                    "type": Sequelize.DATE,
                    "field": "delivered_at"
                },
                "order_status": {
                    "type": Sequelize.ENUM('Received', 'Preparing', 'Delivering', 'Delivered'),
                    "field": "order_status",
                    "allowNull": false
                },
                "delivery_charges": {
                    "type": Sequelize.INTEGER,
                    "field": "delivery_charges",
                    "allowNull": false
                },
                "sub_total": {
                    "type": Sequelize.DOUBLE PRECISION,
                    "field": "sub_total",
                    "allowNull": false
                },
                "total": {
                    "type": Sequelize.DOUBLE PRECISION,
                    "field": "total",
                    "allowNull": false
                },
                "total_after_promo": {
                    "type": Sequelize.DOUBLE PRECISION,
                    "field": "total_after_promo"
                },
                "assigned_driver": {
                    "type": Sequelize.STRING,
                    "field": "assigned_driver"
                },
                "rating": {
                    "type": Sequelize.INTEGER,
                    "field": "rating"
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
                    "onDelete": "cascade",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "name": "user_id",
                    "allowNull": false
                },
                "delivery_address_id": {
                    "type": Sequelize.INTEGER,
                    "field": "delivery_address_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Addresses",
                        "key": "id"
                    },
                    "name": "delivery_address_id",
                    "allowNull": true
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
                },
                "promocode_id": {
                    "type": Sequelize.INTEGER,
                    "field": "promocode_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "PromoCodes",
                        "key": "id"
                    },
                    "name": "promocode_id",
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
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
                "expired": {
                    "type": Sequelize.BOOLEAN,
                    "field": "expired"
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
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "OrderItems",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "quantity": {
                    "type": Sequelize.INTEGER,
                    "field": "quantity",
                    "allowNull": false
                },
                "price": {
                    "type": Sequelize.DOUBLE PRECISION,
                    "field": "price"
                },
                "options": {
                    "type": Sequelize.STRING,
                    "field": "options"
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
                "order_id": {
                    "type": Sequelize.INTEGER,
                    "field": "order_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "Orders",
                        "key": "id"
                    },
                    "name": "order_id",
                    "allowNull": false
                },
                "product_id": {
                    "type": Sequelize.INTEGER,
                    "field": "product_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Products",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
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
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "WorkingHours",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "days": {
                    "type": Sequelize.ARRAY(Sequelize.STRING),
                    "field": "days"
                },
                "opens_at": {
                    "type": Sequelize.STRING,
                    "field": "opens_at"
                },
                "closes_at": {
                    "type": Sequelize.STRING,
                    "field": "closes_at"
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
            {}
        ]
    },
    {
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
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "ProductsTags",
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
                "product_tag_id": {
                    "type": Sequelize.INTEGER,
                    "field": "product_tag_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "ProductTags",
                        "key": "id"
                    },
                    "primaryKey": true
                },
                "product_id": {
                    "type": Sequelize.INTEGER,
                    "field": "product_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Products",
                        "key": "id"
                    },
                    "primaryKey": true
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
