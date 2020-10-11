const   { v4: uuidv4 } = require("uuid"),
        Sequelize = require("sequelize");

exports.init_table = function (sequelize) {
    let Item = sequelize.define('items', {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: "nameDescConstraint",
        },
        type: {
            type: Sequelize.ENUM('suits', 'shirts', 'pants', 'shoes'),
            allowNull: false,
        },
        gender: {
            type: Sequelize.ENUM('male', 'female'),
            allowNull: false,
        },
        image: {
            type: Sequelize.BLOB,
            allowNull: true,
        },
        brand: {
            type: Sequelize.STRING,
            // should we allow null?
            allowNull: true,
        },
        color: {
            type: Sequelize.ENUM('white', 'black', 'beige', 'navy', 'blue', 'multicolored'),
            allowNull: false,
        },
		count: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: false,
            validate: {
                isAlphanumeric: true,
                min: 0
            }
        },
    });

    Item.beforeCreate((item) => {
        return item.id = uuidv4();
    });

    return Item;
}