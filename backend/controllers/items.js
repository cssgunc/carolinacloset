const express = require("express"),
    router = express.Router(),
    itemService = require("../services/item-service"),
    preorderService = require("../services/preorder-service"),
    exceptionHandler = require("../exceptions/exception-handler"),
    userIsBasicUser = require('./util/auth').userIsBasicUser;

/**
 * Route serving visitor item table view
 */
router.get('/', [userIsBasicUser], async function (req, res, next) {
    let response = {};
    try {
        response.items = await itemService.getAllItems();
    } catch (e) {
        response.error = exceptionHandler.retrieveException(e);
    }

    res.render("user/view-items.ejs", { response: response, onyen: res.locals.onyen, userType: res.locals.userType });
});

module.exports = router;