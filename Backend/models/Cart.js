const mongoose = require('mongoose');



// Cart Schema
const CartSchema = new mongoose.Schema({
  userId: String,
  cartItems: [], 
});

module.exports = mongoose.model('Cart', CartSchema);
