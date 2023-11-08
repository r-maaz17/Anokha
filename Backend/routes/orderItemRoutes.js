const express = require('express');
const router = express.Router();
const orderItemController = require('../controller/orderItemController');

// Create a new order item
router.post('/orderItems', orderItemController.createOrderItem);

// Get all order items
router.get('/orderItems', orderItemController.getOrderItems);

// Get an order item by OrderItemId
router.get('/orderItems/:orderItemId', orderItemController.getOrderItemById);

// Update an order item by OrderItemId
router.put('/orderItems/:orderItemId', orderItemController.updateOrderItem);

// Delete an order item by OrderItemId
router.delete('/orderItems/:orderItemId', orderItemController.deleteOrderItem);

module.exports = router;
