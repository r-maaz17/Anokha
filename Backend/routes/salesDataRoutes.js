const express = require('express');
const router = express.Router();
const salesDataController = require('../controller/salesDataController');

// Create a new sales data entry
router.post('/salesData', salesDataController.createSalesData);

// Get all sales data entries
router.get('/salesData', salesDataController.getSalesData);

// Get a sales data entry by SaleId
router.get('/salesData/:saleId', salesDataController.getSalesDataById);

// Update a sales data entry by SaleId
router.put('/salesData/:saleId', salesDataController.updateSalesData);

// Delete a sales data entry by SaleId
router.delete('/salesData/:saleId', salesDataController.deleteSalesData);

module.exports = router;
