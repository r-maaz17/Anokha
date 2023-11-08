const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  OrderId: Number,
  CustomerId: Number,
  OrderDate: Date,
  Status: String,
});

module.exports = mongoose.model('Order', orderSchema);
