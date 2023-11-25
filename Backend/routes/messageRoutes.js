const { verifyAdminMiddleware }= require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();
const messageController = require('../controller/messageController');

// Get All messages from database
router.get('/messages',verifyAdminMiddleware,messageController.getAllMessages);

// Create new message
router.post('/messages',verifyAdminMiddleware,messageController.CreateNewMessage);

//set the Message / Issue status 
router.put('/set-message-status/:id',verifyAdminMiddleware,messageController.setMessageStatus)

module.exports = router;

