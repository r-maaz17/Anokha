const mongoose = require('mongoose');

const loyaltyProgramSchema = new mongoose.Schema({
  ProgramId: Number,
  ProgramName: String,
  Description: String,
  RewardSchema: Object, // Assuming RewardSchema is an object to define the loyalty program's rules
});

module.exports = mongoose.model('LoyaltyProgram', loyaltyProgramSchema);
