const express = require('express');
const router = express.Router();
const onlineStorefrontController = require('./onlineStorefrontController');

// Create a new online storefront
router.post('/onlineStorefronts', onlineStorefrontController.createOnlineStorefront);

// Get all online storefronts
router.get('/onlineStorefronts', onlineStorefrontController.getOnlineStorefronts);

// Get an online storefront by StoreFrontId
router.get('/onlineStorefronts/:storefrontId', onlineStorefrontController.getOnlineStorefrontById);

// Update an online storefront by StoreFrontId
router.put('/onlineStorefronts/:storefrontId', onlineStorefrontController.updateOnlineStorefront);

// Delete an online storefront by StoreFrontId
router.delete('/onlineStorefronts/:storefrontId', onlineStorefrontController.deleteOnlineStorefront);

module.exports = router;
