const express = require('express');
const router = express.Router();
const supplierController = require('../controller/supplierController');

// Create a new supplier
router.post('/suppliers', supplierController.createSupplier);

// Get all suppliers
router.get('/suppliers', supplierController.getSuppliers);

// Get a supplier by SupplierId
router.get('/suppliers/:supplierId', supplierController.getSupplierById);

// Update a supplier by SupplierId
router.put('/suppliers/:supplierId', supplierController.updateSupplier);

// Delete a supplier by SupplierId
router.delete('/suppliers/:supplierId', supplierController.deleteSupplier);

module.exports = router;
