const   { v4: uuidv4 } = require("uuid"),
        Sequelize = require("sequelize");

exports.init_table = function (sequelize) {
    let Transaction = sequelize.define('transactions', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        order_id: {
            type: Sequelize.UUID,
            allowNull: false
        },
        item_id: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        item_name: {
            type: Sequelize.STRING,
            allowNull: true,
        },
		count: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: false
        },
        admin_id: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: false,
            validate: {
                isAlphanumeric: true
            }
        },
		onyen: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: false,
            validate: {
                isAlphanumeric: true
            }
        },
		status: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isIn: [['pending', 'in-use', 'complete', 'cancelled', 'late']]
            }
        },
        return_date: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Date.now() + 2.628e+9, // set return date a month from now
        },
        is_returned: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    });

    Transaction.beforeCreate((transaction) => {
        return transaction.id = uuidv4();
    });

    return Transaction;
}