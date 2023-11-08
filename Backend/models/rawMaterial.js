const mongoose = require('mongoose');

const rawMaterialSchema = new mongoose.Schema({
  MaterialId: Number,
  MaterialName: String,
  SupplierId: Number, // Assuming SupplierId is a reference to the Supplier entity
  StockLevel: Number,
  ReorderThreshold: Number,
});

module.exports = mongoose.model('RawMaterial', rawMaterialSchema);
