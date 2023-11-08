const TrainingSession = require('../models/trainingSession');

// Create a new training session
exports.createTrainingSession = async (req, res) => {
  try {
    const trainingSession = new TrainingSession(req.body);
    await trainingSession.save();
    res.status(201).json(trainingSession);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all training sessions
exports.getTrainingSessions = async (req, res) => {
  try {
    const trainingSessions = await TrainingSession.find();
    res.status(200).json(trainingSessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a training session by sessionId
exports.getTrainingSessionById = async (req, res) => {
  try {
    const trainingSession = await TrainingSession.findOne({ sessionId: req.params.sessionId });
    if (!trainingSession) {
      return res.status(404).json({ message: 'Training session not found' });
    }
    res.status(200).json(trainingSession);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a training session by sessionId
exports.updateTrainingSession = async (req, res) => {
  try {
    const trainingSession = await TrainingSession.findOneAndUpdate(
      { sessionId: req.params.sessionId },
      req.body,
      { new: true }
    );
    if (!trainingSession) {
      return res.status(404).json({ message: 'Training session not found' });
    }
    res.status(200).json(trainingSession);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a training session by sessionId
exports.deleteTrainingSession = async (req, res) => {
  try {
    const trainingSession = await TrainingSession.findOneAndRemove({ sessionId: req.params.sessionId });
    if (!trainingSession) {
      return res.status(404).json({ message: 'Training session not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
