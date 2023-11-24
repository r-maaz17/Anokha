const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// Sign in the user to system
router.post('/signin', authController.login);

// Sign up on the system
router.post('/userauth',authController.getUserAuth);

module.exports = router;
