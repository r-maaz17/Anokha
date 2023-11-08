const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  RoleId: Number,
  RoleName: String,
});

module.exports = mongoose.model('Role', roleSchema);
