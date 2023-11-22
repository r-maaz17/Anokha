const Message = require('../models/Message');

// Create a new customer
exports.CreateNewMessage = async (req, res) => {
    // try {
        req.body.status = 'pending'
      const messenger = new Message(req.body);
      await messenger.save();
      res.status(201).json(messenger);
    // } catch (error) {
    //   res.status(500).json({ error: error.message });
    // }
  };

  exports.getAllMessages = async (req, res) => {
    try {
      const messenger = await Message.find();
      res.status(201).json(messenger);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };