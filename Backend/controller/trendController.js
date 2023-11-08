const Trend = require('../models/trend');

// Create a new trend
exports.createTrend = async (req, res) => {
  try {
    const trend = new Trend(req.body);
    await trend.save();
    res.status(201).json(trend);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all trends
exports.getTrends = async (req, res) => {
  try {
    const trends = await Trend.find();
    res.status(200).json(trends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a trend by TrendId
exports.getTrendById = async (req, res) => {
  try {
    const trend = await Trend.findOne({ TrendId: req.params.trendId });
    if (!trend) {
      return res.status(404).json({ message: 'Trend not found' });
    }
    res.status(200).json(trend);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a trend by TrendId
exports.updateTrend = async (req, res) => {
  try {
    const trend = await Trend.findOneAndUpdate(
      { TrendId: req.params.trendId },
      req.body,
      { new: true }
    );
    if (!trend) {
      return res.status(404).json({ message: 'Trend not found' });
    }
    res.status(200).json(trend);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a trend by TrendId
exports.deleteTrend = async (req, res) => {
  try {
    const trend = await Trend.findOneAndRemove({ TrendId: req.params.trendId });
    if (!trend) {
      return res.status(404).json({ message: 'Trend not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
