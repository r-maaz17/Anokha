const OrderItem = require('../models/orderItem');

// Create a new order item
exports.createOrderItem = async (req, res) => {
  try {
    const orderItem = new OrderItem(req.body);
    await orderItem.save();
    res.status(201).json(orderItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all order items
exports.getOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.find();
    res.status(200).json(orderItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an order item by OrderItemId
exports.getOrderItemById = async (req, res) => {
  try {
    const orderItem = await OrderItem.findOne({ OrderItemId: req.params.orderItemId });
    if (!orderItem) {
      return res.status(404).json({ message: 'Order item not found' });
    }
    res.status(200).json(orderItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an order item by OrderItemId
exports.updateOrderItem = async (req, res) => {
  try {
    const orderItem = await OrderItem.findOneAndUpdate(
      { OrderItemId: req.params.orderItemId },
      req.body,
      { new: true }
    );
    if (!orderItem) {
      return res.status(404).json({ message: 'Order item not found' });
    }
    res.status(200).json(orderItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an order item by OrderItemId
exports.deleteOrderItem = async (req, res) => {
  try {
    const orderItem = await OrderItem.findOneAndRemove({ OrderItemId: req.params.orderItemId });
    if (!orderItem) {
      return res.status(404).json({ message: 'Order item not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
