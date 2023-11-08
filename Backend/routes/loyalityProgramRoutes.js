const express = require('express');
const router = express.Router();
const loyaltyProgramController = require('../controller/loyaltyProgramController');

// Create a new loyalty program
router.post('/loyaltyPrograms', loyaltyProgramController.createLoyaltyProgram);

// Get all loyalty programs
router.get('/loyaltyPrograms', loyaltyProgramController.getLoyaltyPrograms);

// Get a loyalty program by ProgramId
router.get('/loyaltyPrograms/:programId', loyaltyProgramController.getLoyaltyProgramById);

// Update a loyalty program by ProgramId
router.put('/loyaltyPrograms/:programId', loyaltyProgramController.updateLoyaltyProgram);

// Delete a loyalty program by ProgramId
router.delete('/loyaltyPrograms/:programId', loyaltyProgramController.deleteLoyaltyProgram);

module.exports = router;
