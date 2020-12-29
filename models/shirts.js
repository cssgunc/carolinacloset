const Sequelize = require("sequelize");

exports.init_table = function (sequelize) {
    let Shirts = sequelize.define('shirts', {
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
        size: {
            type: Sequelize.ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL'),
            allowNull: false,
        },
    });

    return Shirts;
}