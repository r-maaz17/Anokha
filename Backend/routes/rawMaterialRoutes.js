const express = require('express');
const router = express.Router();
const rawMaterialController = require('../controller/rawMaterialController');

// Create a new raw material
router.post('/rawMaterials', rawMaterialController.createRawMaterial);

// Get all raw materials
router.get('/rawMaterials', rawMaterialController.getRawMaterials);

// Get a raw material by MaterialId
router.get('/rawMaterials/:materialId', rawMaterialController.getRawMaterialById);

// Update a raw material by MaterialId
router.put('/rawMaterials/:materialId', rawMaterialController.updateRawMaterial);

// Delete a raw material by MaterialId
router.delete('/rawMaterials/:materialId', rawMaterialController.deleteRawMaterial);

module.exports = router;
