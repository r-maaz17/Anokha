const express = require('express');
const router = express.Router();
const amazonController = require('../controller/amazonController');
// Create a new user
router.post('/upload', amazonController.upload);
module.exports = router;