const Sequelize = require("sequelize");

exports.init_table = function (sequelize) {
    return sequelize.define('items', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            require: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            require: true,
            unique: true,
        },
		barcode: {
            type: Sequelize.STRING,
            allowNull: true,
            require: false,
            unique: true
        },
		count: {
            type: Sequelize.INTEGER,
            allowNull: false,
            require: true,
            unique: false,
            validate: {
                isAlphanumeric: true,
                min: 0
            }
        },
		description: {
            type: Sequelize.STRING,
            allowNull: true,
            require: false,
            unique: false,
        }
    });
}