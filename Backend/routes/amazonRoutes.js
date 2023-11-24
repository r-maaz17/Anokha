const express = require('express');
const router = express.Router();
const amazonController = require('../controller/amazonController');


// Upload image to amazon s3 bucket
router.post('/upload', amazonController.upload);
module.exports = router;