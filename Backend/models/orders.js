const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId:String,
  userEmail: String,
  OrderDate: String,
  Status: String,
  total: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  updatedBy: String, // New field to store who updated the document
});
orderSchema.pre('save', function (next) {
  // Update the updatedAt field before saving
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Order', orderSchema);
