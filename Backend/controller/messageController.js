const Message = require('../models/Message');
const Log = require('../models/Log');
// Create a new customer
exports.CreateNewMessage = async (req, res) => {
  try {
    req.body.status = 'pending'
    const messenger = new Message({
      ...req.body,
      createdBy: req.user._id || 'unknown',
      updatedBy: req.user._id || 'unknown',
    });
    await messenger.save();
    res.status(201).json(messenger);
  } catch (err) {
    const logEntry = new Log({
      file: 'messageController.js',
      exception: err.message,
    });
    await logEntry.save();
  }
};


// Get all the messages from from database
exports.getAllMessages = async (req, res) => {
  try {
    const messenger = await Message.find();
    res.status(201).json(messenger);
  } catch (err) {
    const logEntry = new Log({
      file: 'messageController.js', 
      exception: err.message,
    });
    await logEntry.save();
  }
};

//Set the status of message 
exports.setMessageStatus = async (req, res) => {
  try {
    if (req.body.status === "in progress" || req.body.status === "solved") {
      const message = await Message.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { status: req.body.status, updatedBy: req.user._id || 'unknown' } },
        { new: true } // This ensures that the updated document is returned
      );
      res.status(200).json(message);
    }

  } catch (err) {
    const logEntry = new Log({
      file: 'messageController.js', 
      exception: err.message,
    });
    await logEntry.save();
  }
};