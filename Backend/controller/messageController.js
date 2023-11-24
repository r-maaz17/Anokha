const Message = require('../models/Message');

// Create a new customer
exports.CreateNewMessage = async (req, res) => {
    try {
        req.body.status = 'pending'
      const messenger = new Message(req.body);
      await messenger.save();
      res.status(201).json(messenger);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


// Get all the messages from from database
  exports.getAllMessages = async (req, res) => {
    try {
      const messenger = await Message.find();
      res.status(201).json(messenger);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  //Set the status of message 
  exports.setMessageStatus = async (req, res) => {
    try {
      if (req.body.status === "in progress" || req.body.status === "solved")
      {
      const message = await Message.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { status: req.body.status} },
        { new: true } // This ensures that the updated document is returned
      );
      res.status(200).json(message);
      }

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };