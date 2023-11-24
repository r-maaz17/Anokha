const mongoose = require('mongoose');

// Product Schema
const productSchema = new mongoose.Schema({
  ProductName: String,
  Description: String,
  Price: String,
  StockQuantity: String,
  LowStockThreshold: String,
  image:String,
  rating :String,
});

productSchema.pre('save', function (next) {
  // Update the updatedAt field and createdBy field before saving
  this.updatedAt = new Date();
  if (!this.createdBy) {
    this.createdBy = this.updatedBy;
  }
  next();
});

productSchema.pre('findOneAndUpdate', function (next) {
  // Update the updatedAt field and updatedBy field before update
  this._update.updatedAt = new Date();
  this._update.updatedBy = this._conditions.createdBy || 'unknown';
  next();
});

module.exports = mongoose.model('Product', productSchema);
