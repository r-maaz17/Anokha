const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
  userId: String,
  name: String,
  email: String,
  Message: String,
  status:String
});

module.exports = mongoose.model('Message', messageSchema);
