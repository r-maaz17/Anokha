const express = require('express');
const router = express.Router();
const stripeController = require('../controller/stripeController');


// Create a stripe session
router.post('/create-checkout-session', stripeController.createCheckout);


module.exports = router;