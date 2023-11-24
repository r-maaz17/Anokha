const mongoose = require('mongoose');


// User Schema
const userSchema = new mongoose.Schema({
  UserId: String,
  Username: String,
  Password: String,
  Email: String,
  RoleId: String,
  token: {
    type: String,
    default: '',
    required: false
  }

});

module.exports = mongoose.model('User', userSchema);
