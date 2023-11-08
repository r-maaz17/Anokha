const mongoose = require('mongoose');

const salesDataSchema = new mongoose.Schema({
  SaleId: Number,
  ProductId: Number,
  SaleDate: Date,
  SaleAmount: Number,
});

module.exports = mongoose.model('SalesData', salesDataSchema);
