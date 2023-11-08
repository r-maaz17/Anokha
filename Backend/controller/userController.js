const User = require('../models/user');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a user by UserId
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ UserId: req.params.userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user by UserId
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { UserId: req.params.userId },
      req.body,
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user by UserId
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndRemove({ UserId: req.params.userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).send();
}
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};
