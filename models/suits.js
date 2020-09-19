const   { v4: uuidv4 } = require("uuid"),
        Sequelize = require("sequelize");

exports.init_table = function (sequelize) {
    let Suits = sequelize.define('suits', {
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

    Suits.beforeCreate((suits) => {
        return suits.id = uuidv4();
    });

    return suits;
}