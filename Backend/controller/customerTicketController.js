const CustomerTicket = require('../models/customerTicket');

// Create a new customer ticket
exports.createCustomerTicket = async (req, res) => {
  try {
    const customerTicket = new CustomerTicket(req.body);
    await customerTicket.save();
    res.status(201).json(customerTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all customer tickets
exports.getCustomerTickets = async (req, res) => {
  try {
    const customerTickets = await CustomerTicket.find();
    res.status(200).json(customerTickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a customer ticket by TicketId
exports.getCustomerTicketById = async (req, res) => {
  try {
    const customerTicket = await CustomerTicket.findOne({ TicketId: req.params.ticketId });
    if (!customerTicket) {
      return res.status(404).json({ message: 'Customer ticket not found' });
    }
    res.status(200).json(customerTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a customer ticket by TicketId
exports.updateCustomerTicket = async (req, res) => {
  try {
    const customerTicket = await CustomerTicket.findOneAndUpdate(
      { TicketId: req.params.ticketId },
      req.body,
      { new: true }
    );
    if (!customerTicket) {
      return res.status(404).json({ message: 'Customer ticket not found' });
    }
    res.status(200).json(customerTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a customer ticket by TicketId
exports.deleteCustomerTicket = async (req, res) => {
  try {
    const customerTicket = await CustomerTicket.findOneAndRemove({ TicketId: req.params.ticketId });
    if (!customerTicket) {
      return res.status(404).json({ message: 'Customer ticket not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
