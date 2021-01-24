const express = require("express"),
    router = express.Router(),
    itemService = require("../services/item-service"),
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

    res.render("user/view-items.ejs", { response: response, onyen: res.locals.onyen, userType: res.locals.userType, title: `All Inventory` });
});
// are all values in an size object undefined
function hasNoSize(size) {
    sizes = Object.values(size)
    isALlUndefined = true
    sizes.forEach(element => {
        if (element != undefined) {
            isALlUndefined = false
        }
    });
    return isALlUndefined
}
/**
 * Get Items based on a specific category
 */
router.get('/:gender/:type/', [userIsBasicUser], async function (req, res, next) {
    //used for suits
    let chestSize = req.query.chestSize
    let sleeveSize = req.query.sleeveSize
    //used for shirts
    let shirtSize = req.query.shirtSize
    //used for pants
    let waistSize = req.query.waistSize
    let pantsLength = req.query.pantsLength
    //used for shoes
    let shoeSize = req.query.shoeSize
    let size = { shoeSize: shoeSize, chestSize: chestSize, sleeveSize: sleeveSize, shirtSize: shirtSize, waistSize: waistSize, pantsLength: pantsLength }
    let response = {};
    try {
        if (req.query.color == undefined && hasNoSize(size)) {
            response.items = await itemService.getItemsByCategory(req.params.gender, req.params.type);
        } else if (req.query.color != undefined && !hasNoSize(size)) {
            response.items = await itemService.getItemCategorySizeColor(req.params.type, req.params.gender, size, Object.keys(req.query.color))
        } else if (req.query.color != undefined) {
            response.items = await itemService.getItemsByCategoryAndColor(req.params.gender, req.params.type, Object.keys(req.query.color))
        } else if (!hasNoSize(size)) {
            response.items = await itemService.getItemCategorySize(req.params.type, req.params.gender, size)
        }
    } catch (e) {
        response.error = exceptionHandler.retrieveException(e);
    }
    res.render("user/view-items.ejs", { response: response, onyen: res.locals.onyen, userType: res.locals.userType, title: `${req.params.gender} ${req.params.type}`, sublink: `/items/${req.params.gender}/${req.params.type}`, type: `${req.params.type}` });
});

module.exports = router;