const   { v4: uuidv4 } = require("uuid"),
        Sequelize = require("sequelize");

exports.init_table = function (sequelize) {
    let Shoes = sequelize.define('shoes', {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            unique: true,
        },
        size: {
            // TODO: what are the available sizes?
            type: Sequelize.ENUM('7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5',
                '11', '11.5', '12'),
            allowNull: false,
        },
    });

    Shoes.beforeCreate((shoes) => {
        return shoes.id = uuidv4();
    });

    return Shoes;
}