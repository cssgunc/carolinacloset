const express = require("express"),
    router = express.Router(),
    orderService = require("../services/order-service"),
    exceptionHandler = require("../exceptions/exception-handler"),
    userIsAdmin = require("./util/auth.js").userIsAdmin;

/**
 * Route serving admin order management view
 */
router.get('/', [userIsAdmin], async function (req, res, next) {
    let response = {};
    response.orders = await orderService.getAllOrders();
    // Negates negative counts because it's implied in the order management view
    for (const t of response.orders) {
        t['count'] = -t['count'];
    }

    res.render('admin/orders.ejs', { response: response, onyen: res.locals.onyen, userType: res.locals.userType });
});

/**
 * Route receiving form to execute an order (after it's picked up)
 * Expects a transaction id in request body
 */
router.post('/execute', [userIsAdmin], async function (req, res) {
    let response = {};
    let id = req.body.id;

    try {
        await orderService.executeOrder(id, res.locals.onyen);
        response.success = "Success! Order successfully executed"
    } catch (e) {
        response.error = "Sorry, there was an error with your request. Please try again later. " + exceptionHandler.retrieveException(e);
    }

    res.render('admin/orders-result.ejs', { response: response, onyen: res.locals.onyen, userType: res.locals.userType });
});

/**
 * Route receiving form to confirm an order
 * Expects a transaction id in request body
 */
router.post('/complete', [userIsAdmin], async function (req, res) {
    let response = {};
    let id = req.body.id;

    try {
        await orderService.completeOrder(id, res.locals.onyen);
        response.success = "Success! Order successfully completed.";
    } catch (e) {
        response.error = "Sorry, there was an error with your request. Please try again later. " + exceptionHandler.retrieveException(e);
    }

    res.render('admin/orders-result.ejs', { response: response, onyen: res.locals.onyen, userType: res.locals.userType });
});

/**
 * Route receiving form to cancel an order
 * Expects a transaction id in request body
 */
router.post('/cancel', [userIsAdmin], async function (req, res, next) {
    let response = {};
    let id = req.body.id;

    try {
        await orderService.cancelOrder(id, res.locals.onyen);
        response.success = "Success! Order successfully canceled.";
    } catch (e) {
        response.error = "Sorry, there was an error with your request. Please try again later. " + exceptionHandler.retrieveException(e);
    }

    res.render('admin/orders-result.ejs', { response: response, onyen: res.locals.onyen, userType: res.locals.userType });
});

module.exports = router;
