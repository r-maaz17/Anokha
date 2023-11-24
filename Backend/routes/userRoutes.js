const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Create a new user
router.post('/user', userController.createUser);

// Get all users
router.get('/users', userController.getUsers);

// Get a user by UserId
router.get('/user/:userId', userController.getUserById);

// Update a user by UserId
router.put('/user/:userId', userController.updateUser);

// Delete a user by UserId
router.delete('/user/:userId', userController.deleteUser);

//Sign up a user 
router.post('/user/signup',userController.signUp)

//Check verification code before creating the user in actuall table
router.post('/user/checkcode',userController.checkCode)

module.exports = router;
