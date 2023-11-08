const express = require('express');
const router = express.Router();
const roleController = require('../controller/roleController');

// Create a new role
router.post('/roles', roleController.createRole);

// Get all roles
router.get('/roles', roleController.getRoles);

// Get a role by RoleId
router.get('/roles/:roleId', roleController.getRoleById);

// Update a role by RoleId
router.put('/roles/:roleId', roleController.updateRole);

// Delete a role by RoleId
router.delete('/roles/:roleId', roleController.deleteRole);

module.exports = router;
