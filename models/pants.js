const   { v4: uuidv4 } = require("uuid"),
        Sequelize = require("sequelize");

exports.init_table = function (sequelize) {
    let Pants = sequelize.define('pants', {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            unique: true,
        },
        waist: {
            // TODO: what are the available sizes?
            type: Sequelize.ENUM('26', '28', '30', '32', '34', '36'),
            allowNull: false,
        },
        length: {
            // TODO: what are the available sizes?
            type: Sequelize.ENUM('26', '28', '30', '32', '34', '36'),
            allowNull: false,
        }
    });

    return pants;
}