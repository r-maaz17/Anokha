const mongoose = require('mongoose');

const trendSchema = new mongoose.Schema({
  TrendId: Number,
  TrendName: String,
  Description: String,
  TrendImageUrl: String,
});

module.exports = mongoose.model('Trend', trendSchema);
