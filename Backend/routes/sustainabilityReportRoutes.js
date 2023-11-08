const express = require('express');
const router = express.Router();
const sustainabilityReportController = require('../controller/sustainabilityReportController');

// Create a new sustainability report
router.post('/sustainabilityReports', sustainabilityReportController.createSustainabilityReport);

// Get all sustainability reports
router.get('/sustainabilityReports', sustainabilityReportController.getSustainabilityReports);

// Get a sustainability report by ReportId
router.get('/sustainabilityReports/:reportId', sustainabilityReportController.getSustainabilityReportById);

// Update a sustainability report by ReportId
router.put('/sustainabilityReports/:reportId', sustainabilityReportController.updateSustainabilityReport);

// Delete a sustainability report by ReportId
router.delete('/sustainabilityReports/:reportId', sustainabilityReportController.deleteSustainabilityReport);

module.exports = router;
