const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  OrderItemId: Number,
  OrderId: Number,
  ProductId: Number,
  Quantity: Number,
});

module.exports = mongoose.model('OrderItem', orderItemSchema);
