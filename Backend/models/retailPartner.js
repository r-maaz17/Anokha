const mongoose = require('mongoose');

const retailPartnerSchema = new mongoose.Schema({
  PartnerId: Number,
  PartnerName: String,
  OutletLocations: [String], // Assuming outlet locations are stored as an array of strings
});

module.exports = mongoose.model('RetailPartner', retailPartnerSchema);
