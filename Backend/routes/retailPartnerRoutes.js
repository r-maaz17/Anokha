const express = require('express');
const router = express.Router();
const retailPartnerController = require('../controller/retailPartnerController');

// Create a new retail partner
router.post('/retailPartners', retailPartnerController.createRetailPartner);

// Get all retail partners
router.get('/retailPartners', retailPartnerController.getRetailPartners);

// Get a retail partner by PartnerId
router.get('/retailPartners/:partnerId', retailPartnerController.getRetailPartnerById);

// Update a retail partner by PartnerId
router.put('/retailPartners/:partnerId', retailPartnerController.updateRetailPartner);

// Delete a retail partner by PartnerId
router.delete('/retailPartners/:partnerId', retailPartnerController.deleteRetailPartner);

module.exports = router;
