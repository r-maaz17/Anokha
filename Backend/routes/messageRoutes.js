const { verifyTokenMiddleware }= require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();
const messageController = require('../controller/messageController');

// Get All messages from database
router.get('/messages',messageController.getAllMessages);

// Create new message
router.post('/messages',messageController.CreateNewMessage);

//set the Message / Issue status 
router.put('/set-message-status/:id',messageController.setMessageStatus)

module.exports = router;

