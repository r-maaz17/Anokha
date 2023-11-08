const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  ProductId: Number,
  ProductName: String,
  Description: String,
  Price: Number,
  StockQuantity: Number,
  LowStockThreshold: Number,
});

module.exports = mongoose.model('Product', productSchema);
