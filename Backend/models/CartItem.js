const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  userId: String,
  productId: String, // Corrected typo: 'ProductId' to 'productId'
  status: String,
});

module.exports = mongoose.model('CartItem', CartItemSchema);
