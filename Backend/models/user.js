const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  UserId: Number,
  Username: String,
  Password: String,
  Email: String,
  RoleId: Number,
});

module.exports = mongoose.model('User', userSchema);
