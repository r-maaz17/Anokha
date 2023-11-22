const { verifyTokenMiddleware }= require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();
const messageController = require('../controller/messageController');

 // Create a new customer
router.get('/messages',messageController.getAllMessages);
router.post('/messages',messageController.CreateNewMessage);

module.exports = router;

