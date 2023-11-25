const mongoose = require('mongoose');


// Message Schema
const messageSchema = new mongoose.Schema({
  userId: String,
  name: String,
  email: String,
  Message: String,
  status:String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: String,
  updatedBy: String,
});

messageSchema.pre('save', function (next) {
  // Update the updatedAt field and createdBy field before saving
  this.updatedAt = new Date();
  if (!this.createdBy) {
    this.createdBy = this.updatedBy;
  }
  next();
});

messageSchema.pre('findOneAndUpdate', function (next) {
  // Update the updatedAt field and updatedBy field before update
  this._update.updatedAt = new Date();
  this._update.updatedBy = this._conditions.createdBy || 'unknown';
  next();
});

module.exports = mongoose.model('Message', messageSchema);
