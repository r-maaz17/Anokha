const express = require('express');
const router = express.Router();
const trendController = require('../controller/trendController');

// Create a new trend
router.post('/trends', trendController.createTrend);

// Get all trends
router.get('/trends', trendController.getTrends);

// Get a trend by TrendId
router.get('/trends/:trendId', trendController.getTrendById);

// Update a trend by TrendId
router.put('/trends/:trendId', trendController.updateTrend);

// Delete a trend by TrendId
router.delete('/trends/:trendId', trendController.deleteTrend);

module.exports = router;
