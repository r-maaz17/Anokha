const SustainabilityReport = require('../models/sustainabilityReport');

// Create a new sustainability report
exports.createSustainabilityReport = async (req, res) => {
  try {
    const sustainabilityReport = new SustainabilityReport(req.body);
    await sustainabilityReport.save();
    res.status(201).json(sustainabilityReport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all sustainability reports
exports.getSustainabilityReports = async (req, res) => {
  try {
    const sustainabilityReports = await SustainabilityReport.find();
    res.status(200).json(sustainabilityReports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a sustainability report by ReportId
exports.getSustainabilityReportById = async (req, res) => {
  try {
    const sustainabilityReport = await SustainabilityReport.findOne({ ReportId: req.params.reportId });
    if (!sustainabilityReport) {
      return res.status(404).json({ message: 'Sustainability report not found' });
    }
    res.status(200).json(sustainabilityReport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a sustainability report by ReportId
exports.updateSustainabilityReport = async (req, res) => {
  try {
    const sustainabilityReport = await SustainabilityReport.findOneAndUpdate(
      { ReportId: req.params.reportId },
      req.body,
      { new: true }
    );
    if (!sustainabilityReport) {
      return res.status(404).json({ message: 'Sustainability report not found' });
    }
    res.status(200).json(sustainabilityReport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a sustainability report by ReportId
exports.deleteSustainabilityReport = async (req, res) => {
  try {
    const sustainabilityReport = await SustainabilityReport.findOneAndRemove({ ReportId: req.params.reportId });
    if (!sustainabilityReport) {
      return res.status(404).json({ message: 'Sustainability report not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
