const Sequelize = require("sequelize");

exports.init_table = function (sequelize) {
    let Shoes = sequelize.define('shoes', {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            unique: true,
            references: {
                model: 'items',
                key: 'id'
            }
        },
        size: {
            type: Sequelize.ENUM( '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5',
                '11', '11.5', '12', '12.5', '13'),
            allowNull: false,
        },
    });

    return Shoes;
}