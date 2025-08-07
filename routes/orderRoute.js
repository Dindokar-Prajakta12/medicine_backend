const express = require('express');
const authenticate = require('../middleware/auth');
const { placeOrder, getUserOrders } = require('../controllers/orderController');
const router = express.Router();

router.post('/place' , authenticate , placeOrder);
router.get('/my-orders', authenticate, getUserOrders);
module.exports = router;