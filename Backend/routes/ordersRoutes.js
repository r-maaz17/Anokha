const express = require('express');
const router = express.Router();
const ordersController = require('../controller/ordersController');

// Create a new order
router.post('/orders', ordersController.createOrder);

// Get all orders
router.get('/orders', ordersController.getOrders);

// Get an order by OrderId
router.get('/orders/:orderId', ordersController.getOrderById);

// Update an order by OrderId
router.put('/orders/:orderId', ordersController.updateOrder);

// Delete an order by OrderId
router.delete('/orders/:orderId', ordersController.deleteOrder);

module.exports = router;
