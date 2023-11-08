const mongoose = require('mongoose');

const sustainabilityReportSchema = new mongoose.Schema({
  ReportId: Number,
  Date: Date,
  Initiatives: String,
  Metrics: String,
});

module.exports = mongoose.model('SustainabilityReport', sustainabilityReportSchema);
