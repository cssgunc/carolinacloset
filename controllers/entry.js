const { suits } = require("../db/sequelize");

const express = require("express"),
    router = express.Router(),
    url = require('url'),
    itemService = require("../services/item-service"),
    userService = require("../services/user-service"),
    exceptionHandler = require("../exceptions/exception-handler"),
    userIsAdmin = require("./util/auth.js").userIsAdmin;

const MANUAL_UPDATE_SUCCESS_MESSAGE = "Item successfully updated!";
const MANUAL_UPDATE_ERROR_MESSAGE = "Error updating item.";

/**
 * Route serving homepage for item entry
 */
router.get("/", [userIsAdmin], async function (req, res) {
    let response = {};
    res.render("admin/entry.ejs", { response: response, onyen: res.locals.onyen, userType: res.locals.userType });
});

/**
 * Route serving page for item entry table
 */
router.get("/search", [userIsAdmin], async function (req, res) {
    let response = {};
    if (req.query.prevOnyen) response.prevOnyen = req.query.prevOnyen;
    try {
        response.items = await itemService.getAllItems();
    } catch (e) {
        response.error = exceptionHandler.retrieveException(e);
    }

    res.render("admin/entry-search.ejs", { response: response, onyen: res.locals.onyen, userType: res.locals.userType });
});

/**
 * Route serving page for manual item entry
 */
router.get("/manual", [userIsAdmin], async function (req, res) {
    response = {};

    // this success field is passed back by a redirect from /entry/manual/update
    // allows us to give the user feedback for their update
    let success = req.query.success;
    if (success) {
        if (success === "0") {
            response.error = MANUAL_UPDATE_ERROR_MESSAGE;
        } else if (success === "1") {
            response.success = MANUAL_UPDATE_SUCCESS_MESSAGE;
        }
    }

    response.foundItem = {
        name: req.query.name,
        type: req.query.type,
    };

    res.render("admin/entry-manual.ejs", { response: response, onyen: res.locals.onyen, userType: res.locals.userType });
});

/**
 * Route receiving form for new manual item creation
 * Expects item name and type in request body
 * If the item exists, we pass the existing item back to the view
 * Else we create a new item
 */
router.post('/manual', [userIsAdmin], async function (req, res) {
    let response = {};

    try {
        let type = req.body.type;
        let gender = req.body.gender;
        let image = req.body.image; // TODO Need to change this from a body param to file
        let brand = req.body.brand;
        let color = req.body.color;
        let count = req.body.count;
        //used for suits
        let chestSize = req.body.chestSize
        let sleeveSize = req.body.sleeveSize
        //used for shirts
        let shirtSize = req.body.shirtSize
        //used for pants
        let waistSize = req.body.waistSize
        let pantsLength = req.body.pantsLength
        //used for shoes
        let shoeSize = req.body.shoeSize
        let size = { shoeSize: shoeSize, chestSize: chestSize, sleeveSize: sleeveSize, shirtSize: shirtSize, waistSize: waistSize, pantsLength: pantsLength }

        // if no brand provided use "Generic"
        if (!brand) {
            brand = "Generic"
        }

        if (type && gender && color && brand) {
            // try searching  type gender color brand 

            let item = await itemService.getItemAndSize(type, gender, color, brand, size);

            // if the item is found, we send back a message and the found item
            if (item) {
                response.itemFound = item;
                response.sizing = {}
                let current = null
                //grab the corresponding sizing infromation if it exists
                switch (item.type) {
                    case "suits":
                        response.sizing = await itemService.getSuit(item.id)
                        break;
                    case "shirts":
                        response.sizing = await itemService.getShirt(item.id)

                        break;
                    case "pants":
                        response.sizing = await itemService.getPants(item.id)

                        break;
                    case "shoes":
                        response.sizing = await itemService.getShoes(item.id)

                        break;

                }
                console.log(response.sizing, "here")



                res.render("admin/entry-manual.ejs", { response: response, onyen: res.locals.onyen, userType: res.locals.userType });
                return;
            }
        }

        let item = await itemService.createItem((gender + " " + brand + " " + type), type, gender, image, brand, color, count, size);
        if (item) {

            response.success = 'New item successfully created, id: ' + item.id;
        } else {
            response.error = 'Failed to create new item. Please try again later.'
        }
    } catch (e) {
        response.error = exceptionHandler.retrieveException(e);
    }

    res.render("admin/entry-manual.ejs", { response: response, onyen: res.locals.onyen, userType: res.locals.userType });
});

/**
 * Route receiving form to update an existing item
 * Expects an item id and quantity in request body
 * Updates the item and then redirects back to /manual with query params to signal success or error
 */
router.post("/manual/update", [userIsAdmin], async function (req, res) {
    let id = req.body.id;
    let quantity = parseInt(req.body.quantity);

    try {
        if (quantity > 0) {
            console.log("Add");
            await itemService.addItems(id, quantity, res.locals.onyen, res.locals.onyen);
        } else if (quantity < 0) {
            console.log("Remove");
            await itemService.removeItems(id, -quantity, res.locals.onyen, res.locals.onyen);
        }
        else {
            res.redirect(url.format({
                pathname: "/entry/manual",
                query: {
                    "success": "0"
                }
            }));
            return;
        }
        res.redirect(url.format({
            pathname: "/entry/manual",
            query: {
                "success": "1"
            }
        }));
    } catch (e) {
        console.error(e);
        res.redirect(url.format({
            pathname: "/entry/manual",
            query: {
                "success": "0"
            }
        }));
    }
});

/**
 * Route receiving quantity to add to an existing item
 * Expects an item id and quantity in request body
 * Redirects to /entry/search
 */
router.post("/add", [userIsAdmin], async function (req, res) {
    let id = req.body.id;
    let quantity = parseInt(req.body.quantity);

    if (quantity > 0) {
        await itemService.addItems(id, quantity, res.locals.onyen, res.locals.onyen);
    }

    res.redirect(url.format({
        pathname: "/entry/search"
    }));
});

/**
 * Route receiving quantity to remove from an existing item
 * Expects an item id, visitor onyen, and quantity in request body
 * If the visitor onyen is not in the user database, or their account info is not filled out
 * the admin is shown a view to update this info
 * Redirects to /entry/search
 */
router.post("/remove", [userIsAdmin], async function (req, res) {
    let response = {};

    let id = req.body.id;
    let onyen = req.body.onyen;
    let quantity = parseInt(req.body.quantity);

    if (quantity > 0) {
        await itemService.removeItems(id, quantity, onyen, res.locals.onyen);
    }

    let user = await userService.getUser(onyen);

    if (!user) {
        user = await userService.createUser(onyen, 'user', null, null);
    }
    // If user is missing account info, render a view for the admin to fill out the user's info
    if (!user.get('pid') || !user.get('email')) {
        response.onyen = onyen;
        response.pid = user.get('pid');
        response.email = user.get('email');
        res.render('admin/entry-update-info.ejs', { response: response, onyen: res.locals.onyen, userType: res.locals.userType })
        return;
    }

    res.redirect(url.format({
        pathname: "/entry/search",
        query: {
            "prevOnyen": onyen
        }
    }));
});

/**
 * Route receiving updated user info for a new visitor
 * Expects visitor onyen, pid, and email address in request body
 * Redirects to /entry/search
 */
router.post("/remove/update", [userIsAdmin], async function (req, res) {
    let response = {};
    let type = req.body.type;
    let onyen = req.body.onyen;
    let pid = req.body.pid;
    let email = req.body.email;

    // Re-renders form if not enough info is given
    if (!pid || !email) {
        response.onyen = onyen;
        response.pid = pid;
        response.email = email;
        response.error = "Please input both a PID and an email address."
        res.render('admin/entry-update-info.ejs', { response: response, onyen: res.locals.onyen, userType: res.locals.userType })
    } else {
        try {
            await userService.editUser(onyen, type, pid, email);
        } catch (e) {
            throw exceptionHandler.retrieveException(e);
        }

        res.redirect(url.format({
            pathname: "/entry/search",
            query: {
                "prevOnyen": onyen
            }
        }));
    }
});

/**
 * Route receiving form to edit an item from the table entry view
 * Expects item id, name, and type in request body
 * Redirects to /entry/search
 */
router.post("/edit", [userIsAdmin], async function (req, res) {
    let response = {};

    let id = req.body.id;
    let name = req.body.name;
    let type = req.body.type;
    let gender = req.body.gender;
    let image = req.body.image;
    let brand = req.body.brand;
    let color = req.body.color;
    try {
        let item = await itemService.editItem(id, name, type, gender, image, brand, color);
    } catch (e) {
        response.error = exceptionHandler.retrieveException(e);
    }
    res.redirect("/entry/search");
});

/**
 * Route serving the item CSV import page
 */
router.get('/import', [userIsAdmin], async function (req, res, next) {
    let response = {};
    res.render('admin/entry-import.ejs', { response: response, onyen: res.locals.onyen, userType: res.locals.userType });
});

/**
 * Route receiving a CSV file upload for item import
 * expects CSV file in request files
 */
router.post('/import', [userIsAdmin], async function (req, res, next) {
    let response = {};

    if (req.files != null) {
        let file = req.files.file;

        // If not a CSV file, set response error
        if (!file.name.match(/\.csv$/i)) {
            response.error = "Please upload a valid CSV file";
        } else {
            try {
                let result = await itemService.appendCsv(file);
                if (result) response.success = "CSV file successfully imported!";
                else response.error = "An unknown error occurred.";
            } catch (e) {
                response.error = "An error occurred with the CSV file. The error message can be found in the console.";
            }
        }
    }
    else response.error = "Please select a CSV file to upload"; // user never selected a file

    res.render('admin/entry-import.ejs', { response: response, onyen: res.locals.onyen, userType: res.locals.userType });
});

module.exports = router;