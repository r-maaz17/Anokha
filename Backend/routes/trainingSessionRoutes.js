const express = require('express');
const router = express.Router();
const trainingSessionController = require('../controller/trainingSessionController');

// Create a new training session
router.post('/trainingSessions', trainingSessionController.createTrainingSession);

// Get all training sessions
router.get('/trainingSessions', trainingSessionController.getTrainingSessions);

// Get a training session by sessionId
router.get('/trainingSessions/:sessionId', trainingSessionController.getTrainingSessionById);

// Update a training session by sessionId
router.put('/trainingSessions/:sessionId', trainingSessionController.updateTrainingSession);

// Delete a training session by sessionId
router.delete('/trainingSessions/:sessionId', trainingSessionController.deleteTrainingSession);

module.exports = router;
