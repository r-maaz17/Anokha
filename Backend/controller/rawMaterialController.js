const RawMaterial = require('../models/rawMaterial');

// Create a new raw material
exports.createRawMaterial = async (req, res) => {
  try {
    const rawMaterial = new RawMaterial(req.body);
    await rawMaterial.save();
    res.status(201).json(rawMaterial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all raw materials
exports.getRawMaterials = async (req, res) => {
  try {
    const rawMaterials = await RawMaterial.find();
    res.status(200).json(rawMaterials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a raw material by MaterialId
exports.getRawMaterialById = async (req, res) => {
  try {
    const rawMaterial = await RawMaterial.findOne({ MaterialId: req.params.materialId });
    if (!rawMaterial) {
      return res.status(404).json({ message: 'Raw material not found' });
    }
    res.status(200).json(rawMaterial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a raw material by MaterialId
exports.updateRawMaterial = async (req, res) => {
  try {
    const rawMaterial = await RawMaterial.findOneAndUpdate(
      { MaterialId: req.params.materialId },
      req.body,
      { new: true }
    );
    if (!rawMaterial) {
      return res.status(404).json({ message: 'Raw material not found' });
    }
    res.status(200).json(rawMaterial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a raw material by MaterialId
exports.deleteRawMaterial = async (req, res) => {
  try {
    const rawMaterial = await RawMaterial.findOneAndRemove({ MaterialId: req.params.materialId });
    if (!rawMaterial) {
      return res.status(404).json({ message: 'Raw material not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
