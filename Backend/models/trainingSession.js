const mongoose = require('mongoose');

const trainingSessionSchema = new mongoose.Schema({
  sessionId: Number,
  SessionName: String,
  Description: String,
  SessionDate: Date,
  Materials: [String], // Assuming materials are stored as an array of strings
});

module.exports = mongoose.model('TrainingSession', trainingSessionSchema);
