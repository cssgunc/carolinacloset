let express     = require("express"),
    router      = express.Router(),
    account     = require("./account"),
    admin       = require("./admin"),
    cart        = require("./cart"),
    entry       = require("./entry"),
    history     = require("./history"),
    item        = require("./items"),
    orders   = require("./orders");

router.use("/account", account);
router.use("/admin", admin);
router.use("/cart", cart);
router.use("/entry", entry);
router.use("/history", history);
router.use("/items", item);
router.use("/orders", orders);

module.exports = router;