const   { v4: uuidv4 } = require("uuid"),
        Sequelize = require("sequelize");

exports.init_table = function (sequelize) {
    let Shirts = sequelize.define('shirts', {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            unique: true,
        },
        size: {
            // TODO: what are the available sizes?
            type: Sequelize.ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL'),
            allowNull: false,
        },
    });

    return shirts;
}