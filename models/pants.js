const Sequelize = require("sequelize");

exports.init_table = function (sequelize) {
    let Pants = sequelize.define('pants', {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            unique: true,
            references: {
                model: 'items',
                key: 'id'
            }
        },
        waist: {
            type: Sequelize.ENUM('26', '28', '30', '32', '34', '36'),
            allowNull: false,
        },
        length: {
            type: Sequelize.ENUM('26', '28', '30', '32', '34', '36'),
            allowNull: false,
        }
    });

    return Pants;
}