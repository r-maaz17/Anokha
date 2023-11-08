const express = require('express');
const router = express.Router();
const customerTicketController = require('../controller/customerTicketController');

// Create a new customer ticket
router.post('/customerTickets', customerTicketController.createCustomerTicket);

// Get all customer tickets
router.get('/customerTickets', customerTicketController.getCustomerTickets);

// Get a customer ticket by TicketId
router.get('/customerTickets/:ticketId', customerTicketController.getCustomerTicketById);

// Update a customer ticket by TicketId
router.put('/customerTickets/:ticketId', customerTicketController.updateCustomerTicket);

// Delete a customer ticket by TicketId
router.delete('/customerTickets/:ticketId', customerTicketController.deleteCustomerTicket);

module.exports = router;
