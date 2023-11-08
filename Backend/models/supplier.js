const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  SupplierId: Number,
  SupplierName: String,
  ContactInfo: String,
});

module.exports = mongoose.model('Supplier', supplierSchema);
