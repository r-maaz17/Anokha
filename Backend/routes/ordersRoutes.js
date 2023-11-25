const express = require('express');
const router = express.Router();
const ordersController = require('../controller/ordersController');
const { verifyAdminMiddleware }= require('../middleware/authMiddleware');

// Create a new order
router.post('/order/create', verifyAdminMiddleware,ordersController.createOrder);

// Get all orders
router.get('/orders', verifyAdminMiddleware,ordersController.getOrders);

// Get an order by OrderId
router.get('/orders/:orderId', verifyAdminMiddleware,ordersController.getOrderById);

// Update an order by OrderId
router.put('/order/:id',verifyAdminMiddleware,ordersController.setOrderStatus);

// Delete an order by OrderId
router.delete('/orders/:orderId', verifyAdminMiddleware,ordersController.deleteOrder);

module.exports = router;
