const   { v4: uuidv4 } = require("uuid"),
        Item = require("../db/sequelize").items,
        Order = require("../db/sequelize").orders,
        Transaction = require("../db/sequelize").transactions,
        Sequelize = require("sequelize"),
        sequelize = require("../db/sequelize"),
        userService = require("./user-service"),
        BadRequestException = require("../exceptions/bad-request-exception"),
        InternalErrorException = require("../exceptions/internal-error-exception"),
        CarolinaCupboardException = require("../exceptions/carolina-cupboard-exception"),
        exceptionHandler = require("../exceptions/exception-handler"),
        csvParser = require("csv-parse");


/**
 * Retrieves and returns an item by id
 * @param {uuid} itemId 
 */
exports.getItem = async function (itemId) {
    try {
        let item = await Item.findOne({ where: { id: itemId } });
        if (!item) {
            throw new BadRequestException("The item could not be retrieved.");
        }
        return item;
    } catch (e) {
        if(e instanceof CarolinaCupboardException) {
            throw e;
        }

        throw new InternalErrorException("A problem occurred when retrieving the item",e);
    }
}

/**
 * Retrieves and returns all items from the Items table
 */
exports.getAllItems = async function () {
    try {
        let items = await Item.findAll();
        return items;
    } catch (e) {
        throw new InternalErrorException("A problem occurred when retrieving items",e);
    }
}

/**
 * Looks for an item, first by barcode, then by name and decription
 * Returns the item found or null if nothing is found
 * @param {enum} type
 * @param {string} name 
 */

exports.getItemByTypeThenName = async function (type, name) {
    try {
        let item = await getItemByType(type);
        if(!item) item = await getItemByName(name);
        return item;
    } catch (e) {
        throw e;
    }
}

/**
 * Looks for an item by barcode
 * Returns the item found or null if nothing is found
 * @param {enum} type
 */

let getItemByType = async function (type) {
    if (!type) return null;
    try {
        let item = await Item.findOne({ where: { type: type }});
        return item;
    } catch (e) {
        throw e;
    }
}

/**
 * Looks for an item by name and description
 * Returns the item fround or null if nothing is found
 * @param {string} name 
 */

let getItemByName = async function (name) {
    try {
        name = name ? name : '';
        let item = await Item.findOne({ where: { name: name }});
        return item;
    } catch (e) {
        throw e;
    }
}

/**
 * Creates a new item in the Items table
 * @param {string} name 
 * @param {number} barcode 
 * @param {number} barcode 
 */

exports.createItem = async function (name, type, count) {
    try {
        let item = await Item.create({
            id: '',
            name: name,
            type: type,
            count: count
        });
        return item;
    } catch (e) {
        if (e instanceof Sequelize.ValidationError) {
            let errorMessage = "The following values are invalid:";
            e.errors.forEach((error) => {
                errorMessage += `\n${error.path}: ${error.message}`;
            });
            throw new BadRequestException(errorMessage);
        }
        throw new InternalErrorException("A problem occurred when saving the item",e);
    }
}

/**
 * Updates an existing item in the Items table
 * Does not allow editing of count
 * @param {uuid} id 
 * @param {string} name 
 * @param {enum} type 
 * @param {enum} gender 
 * @param {string} brand 
 * @param {enum} color 
 */
exports.editItem = async function (id, name, type, gender, brand, color) {
    try {
        let item = await Item.update({
            name: name,
            type: type,
            gender: gender,
            brand: brand,
            color: color,
        }, {
            where: { id, id },
            fields: ['name', 'type', 'gender', 'brand', 'color'],
            returning: true
        });
        return item;
    } catch (e) {
        if (e instanceof Sequelize.ValidationError) {
            let errorMessage = "The following values are invalid:";
            e.errors.forEach((error) => {
                errorMessage += `\n${error.path}: ${error.message}`;
            });
            throw new BadRequestException(errorMessage);
        }
        throw new InternalErrorException("A problem occurred when saving the item",e);
    }
}

/**
 * Creates a new transaction to add a specified quantity of an item
 * @param {uuid} itemId - id of item to transact
 * @param {number} quantity - quantity of item to transact
 * @param {string} onyen - onyen of visitor who is taking or donating items
 */

exports.addItems = async function (itemId, quantity, onyen ) {
    try {
        await this.createTransaction(itemId, quantity, onyen );
    } catch (e) {
        if (e instanceof InternalErrorException) throw exceptionHandler.retrieveException(e);
        else throw e;
    }
}

/**
 * Creates a new transaction to remove a specified quantity of an item
 * @param {uuid} itemId - id of item to transact
 * @param {number} quantity - quantity of item to transact
 * @param {string} onyen - onyen of visitor who is taking or donating items
 */

exports.removeItems = async function (itemId, quantity, onyen) {
    try {
        await this.createTransaction(itemId, -quantity, onyen);
        let user = await userService.getUser(onyen);

        // Update first item date
        // Create new user if they don't exist
        if (!user) {
            await userService.createUser(onyen, 'user', null, null);
            await userService.updatefirstItemDate(onyen, new Date());
        }
        else if (!user.get('firstItemDate')) {
            await userService.updatefirstItemDate(onyen, new Date());
        }

        // Update num items received
        await userService.incrementItemsReceived(onyen, quantity);
    } catch (e) {
        if (e instanceof InternalErrorException) throw exceptionHandler.retrieveException(e);
        else throw e;
    }
}

/**
 * Creates a new transaction
 * @param {uuid} itemId - id of item to transact
 * @param {number} quantity - quantity of item to transact
 * @param {string} onyen - onyen of visitor who is taking or donating items
 */

exports.createTransaction = async function (itemId, quantity, onyen) {
    let item = await this.getItem(itemId);

    if(quantity < 0 && item.count < Math.abs(quantity)) {
        throw new BadRequestException("The amount requested is larger than the quantity in the system");
    }

    try {
        const newOrderId = uuidv4();
        await Order.create({ id: newOrderId })
        let transaction = await Transaction.build({
            id: '',
            item_id: itemId,
            item_name: item.get('name'),
            count: quantity,
            onyen: onyen,
            order_id: newOrderId,
            status: "complete"
        });
        await transaction.save();
        item.increment('count', {by: quantity});
    } catch (e) {
        throw new InternalErrorException("A problem occurred when adding the transaction",e);
    }
}

/**
 * Appends a given CSV to the item table
 * On duplicate, adds the existing count and the new count together
 * @param {file} data 
 */
exports.appendCsv = async function (data) {
    // wrapping everything in a Promise, so we can return exceptions from the csvParser callback
    // this will allow the caller to tell when the Item table creation fails
    return new Promise((resolve, reject) => {
        try {
            csvParser(data.data, 
                {
                    delimiter: ',', 
                    endLine: '\n', 
                    escapeChar: '"', 
                    enclosedChar: '"'
                }, 
                function(err, output) {
                    if (err) {
                        throw new InternalErrorException("A problem occurred when parsing CSV data");
                    }

                    for(let i = 0; i < output.length; i++) {
                        let entry = output[i];

                        // Skip row headers
                        if ((entry.length === 7 && i === 0) ||
                            (entry.length === 4 
                            && entry[0] === 'name'
                            && entry[1] === 'barcode'
                            && entry[2] === 'count'
                            && entry[3] === 'description')) continue;

                        let item = "";

                        // Generate date for createdAt and updatedAt fields and strip timezone for Postgres
                        let date = new Date();
                        date = date.toLocaleDateString() + " " + date.toLocaleTimeString();

                        // Expects a file with only the necessary data
                        if (entry.length === 4) {
                            if (parseInt(entry[2]) < 1) continue;
                            // Empty barcode maps to NULL for our Postgres model, pre-wrap with single quotes
                            let barcode = entry[1] === "" ? "NULL" : "'" + entry[1] + "'";
                            // Prep values for query by enclosing in paren, wrapping in single quotes (except barcode), and joining by comma
                            // Postgres uses double single quotes to escape single quotes in strings, so we do a replace
                            item = "('" + uuidv4() + "'," + [entry[0], barcode, entry[2], entry[3], date, date].map((s,i) => { return i === 1 ? s : "'"+s.replace(/'/g, "''")+"'" }).join(",") + ")";
                        }
                        // Expects a file with the same format as an exported file
                        else if (entry.length === 7) {
                            if (parseInt(entry[3]) < 1) continue;
                            // Empty barcode maps to NULL for our Postgres model, pre-wrap with single quotes
                            let barcode = entry[2] === "" ? "NULL" : "'" + entry[2] + "'";
                            // Prep values for query by enclosing in paren, wrapping in single quotes (except barcode), and joining by comma
                            // Postgres uses double single quotes to escape single quotes in strings, so we do a replace
                            item = "('" + uuidv4() + "'," + [entry[1], barcode, entry[3], entry[4], date, date].map((s,i) => { return i === 1 ? s : "'"+s.replace(/'/g, "''")+"'" }).join(",") + ")";
                        }
                        else {
                            let error = "File not in the expected format, see line " + (i+1);
                            console.error(error);
                            reject(error);
                        }

                        // Execute query, on conflict with name/desc composite primary key, add existing and new counts
                        sequelize.query(
                            `INSERT INTO items 
                            (id, name, barcode, count, description, "createdAt", "updatedAt") 
                            VALUES ${item}
                            ON CONFLICT (name, description)
                            DO UPDATE
                            SET count = items.count + EXCLUDED.count`
                        ).then(function(result) {
                            resolve(result);
                        }).catch(function(e) {
                            console.error(e);
                            reject(e);
                        });
                    }
                }
            );
        } catch(e) {
            console.error(e);
            reject(e);
        }
    });
}

/**
 * Deletes all items in the Items table
 */
exports.deleteAllItems = async function() {
    try {
        await Item.destroy({
            where: {},
            truncate: false
        });
    } catch(e) {
        if (e.name === "SequelizeForeignKeyConstraintError") {
            throw e;
        }

        if(e instanceof CarolinaCupboardException) {
            throw e;
        }
        
        throw new InternalErrorException("A problem occurred when deleting the items", e);
    }
}