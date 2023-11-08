const LoyaltyProgram = require('../models/loyaltyProgram');

// Create a new loyalty program
exports.createLoyaltyProgram = async (req, res) => {
  try {
    const loyaltyProgram = new LoyaltyProgram(req.body);
    await loyaltyProgram.save();
    res.status(201).json(loyaltyProgram);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all loyalty programs
exports.getLoyaltyPrograms = async (req, res) => {
  try {
    const loyaltyPrograms = await LoyaltyProgram.find();
    res.status(200).json(loyaltyPrograms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a loyalty program by ProgramId
exports.getLoyaltyProgramById = async (req, res) => {
  try {
    const loyaltyProgram = await LoyaltyProgram.findOne({ ProgramId: req.params.programId });
    if (!loyaltyProgram) {
      return res.status(404).json({ message: 'Loyalty program not found' });
    }
    res.status(200).json(loyaltyProgram);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a loyalty program by ProgramId
exports.updateLoyaltyProgram = async (req, res) => {
  try {
    const loyaltyProgram = await LoyaltyProgram.findOneAndUpdate(
      { ProgramId: req.params.programId },
      req.body,
      { new: true }
    );
    if (!loyaltyProgram) {
      return res.status(404).json({ message: 'Loyalty program not found' });
    }
    res.status(200).json(loyaltyProgram);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a loyalty program by ProgramId
exports.deleteLoyaltyProgram = async (req, res) => {
  try {
    const loyaltyProgram = await LoyaltyProgram.findOneAndRemove({ ProgramId: req.params.programId });
    if (!loyaltyProgram) {
      return res.status(404).json({ message: 'Loyalty program not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
