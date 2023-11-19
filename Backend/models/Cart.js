const mongoose = require('mongoose');
const CartItemSchema = require('./CartItem'); // Assuming CartItem model is in the same directory

const CartSchema = new mongoose.Schema({
  userId: String,
  cartItems: [], // Use CartItemSchema as a type, not a model
});

module.exports = mongoose.model('Cart', CartSchema);
