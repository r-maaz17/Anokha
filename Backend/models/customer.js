const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  CustomerId: Number,
  UserId: Number, // Assuming UserId is a reference to the User entity
  Demographics: Object, // You can define demographics as an object
  Preferences: Object, // You can define preferences as an object
  Feedback: String,
});

module.exports = mongoose.model('Customer', customerSchema);
