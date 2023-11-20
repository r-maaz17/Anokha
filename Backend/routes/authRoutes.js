const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// Create a new user
router.post('/signin', authController.login);
router.post('/userauth',authController.getUserAuth);
module.exports = router;
