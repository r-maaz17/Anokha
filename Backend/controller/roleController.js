const Role = require('../models/role');

// Create a new role
exports.createRole = async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all roles
exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a role by RoleId
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findOne({ RoleId: req.params.roleId });
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a role by RoleId
exports.updateRole = async (req, res) => {
  try {
    const role = await Role.findOneAndUpdate(
      { RoleId: req.params.roleId },
      req.body,
      { new: true }
    );
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a role by RoleId
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findOneAndRemove({ RoleId: req.params.roleId });
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
