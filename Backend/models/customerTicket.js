const mongoose = require('mongoose');

const customerTicketSchema = new mongoose.Schema({
  TicketId: Number,
  CustomerId: Number, // Assuming CustomerId is a reference to the Customer entity
  Subject: String,
  Description: String,
  Status: String,
  ResolutionTime: Date,
});

module.exports = mongoose.model('CustomerTicket', customerTicketSchema);
