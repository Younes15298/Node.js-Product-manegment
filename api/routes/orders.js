const express = require("express");
const router = express.Router();
const orderController =require("../controllers/order");
const checkAuth = require('../middleware/check-auth');


router.get("/",checkAuth,orderController.get_all_orders);
router.post("/",checkAuth, orderController.add_order);
router.get("/:orderId",checkAuth, orderController.get_specific_order);
router.delete("/:orderId",checkAuth,orderController.delete_specific_order );
//===========================================================================
module.exports = router;
