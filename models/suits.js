const Sequelize = require("sequelize");

exports.init_table = function (sequelize) {
    let Suits = sequelize.define('suits', {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            unique: true,
            references: {
                model: 'items',
                key: 'id'
            },
            primaryKey: true
        },
        chest: {
            type: Sequelize.ENUM('35', '36', '37', '38', '39', '40', '41',
                '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53',
                '54', '55'),
            allowNull: false,
        },
        sleeve: {
            type: Sequelize.ENUM('35', '36', '37', '38', '39', '40', '41',
                '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53',
                '54', '55'),
            allowNull: false,
        },
    });

    return Suits;
}