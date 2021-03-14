const express = require("express"),
    router = express.Router(),
    orderService = require("../services/order-service"),
    exceptionHandler = require("../exceptions/exception-handler"),
    userIsBasicUser = require('./util/auth').userIsBasicUser;

/**
 * Route serving view of the user's cart
 */
router.get('/', [userIsBasicUser], function(req, res, next) {
    let response = {};

    res.render('user/cart.ejs', { response: response, onyen: res.locals.onyen, userType: res.locals.userType });
});

/**
 * Route receiving form to check out the user's cart
 * Receives an array of items with quantities, creates a new transaction group, creates transactions for each item
 */
router.post('/', [userIsBasicUser], async function(req, res) {
    let response = {};
    let cart = JSON.parse(req.body.cart);
    
    try{
        let success = await orderService.createOrder(cart, res.locals.onyen);
        if (success) {
            response.success = 'Your order has been successfully placed! Visit Carolina Closet to pickup your items within the next 24 hours.';
        } else {
            response.error = 'Unknown error occurred. Please try again later or contact Carolina Closet staff.';
        }
    } catch(e) {
        console.error(exceptionHandler.retrieveException(e));
        response.error = exceptionHandler.retrieveException(e);
    }

    res.render('user/cart.ejs', { response: response, onyen: res.locals.onyen, userType: res.locals.userType });
});

module.exports = router;