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
                isIn: [['pending', 'complete', 'cancelled', 'late']]
            }
        },

        return_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },

        is_returned: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        }
    });

    Transaction.beforeCreate((transaction) => {
        return transaction.id = uuidv4();
    });

    return Transaction;
}