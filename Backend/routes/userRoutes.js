const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Create a new user
router.post('/users', userController.createUser);

// Get all users
router.get('/users', userController.getUsers);

// Get a user by UserId
router.get('/users/:userId', userController.getUserById);

// Update a user by UserId
router.put('/users/:userId', userController.updateUser);

// Delete a user by UserId
router.delete('/users/:userId', userController.deleteUser);

module.exports = router;
