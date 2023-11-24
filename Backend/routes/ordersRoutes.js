const express = require('express');
const router = express.Router();
const ordersController = require('../controller/ordersController');
const { verifyTokenMiddleware }= require('../middleware/authMiddleware');

// Create a new order
router.post('/order/create', verifyTokenMiddleware,ordersController.createOrder);

// Get all orders
router.get('/orders', ordersController.getOrders);

// Get an order by OrderId
router.get('/orders/:orderId', ordersController.getOrderById);

// Update an order by OrderId
router.put('/order/:id',verifyTokenMiddleware,ordersController.setOrderStatus);

// Delete an order by OrderId
router.delete('/orders/:orderId', ordersController.deleteOrder);

module.exports = router;
