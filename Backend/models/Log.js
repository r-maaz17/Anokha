const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  file: String,
  lineNumber: Number,
  exception: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Log', logSchema);
