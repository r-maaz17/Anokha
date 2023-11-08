const SalesData = require('../models/salesData');

// Create a new sales data entry
exports.createSalesData = async (req, res) => {
  try {
    const salesData = new SalesData(req.body);
    await salesData.save();
    res.status(201).json(salesData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all sales data entries
exports.getSalesData = async (req, res) => {
  try {
    const salesData = await SalesData.find();
    res.status(200).json(salesData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a sales data entry by SaleId
exports.getSalesDataById = async (req, res) => {
  try {
    const salesData = await SalesData.findOne({ SaleId: req.params.saleId });
    if (!salesData) {
      return res.status(404).json({ message: 'Sales data entry not found' });
    }
    res.status(200).json(salesData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a sales data entry by SaleId
exports.updateSalesData = async (req, res) => {
  try {
    const salesData = await SalesData.findOneAndUpdate(
      { SaleId: req.params.saleId },
      req.body,
      { new: true }
    );
    if (!salesData) {
      return res.status(404).json({ message: 'Sales data entry not found' });
    }
    res.status(200).json(salesData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a sales data entry by SaleId
exports.deleteSalesData = async (req, res) => {
  try {
    const salesData = await SalesData.findOneAndRemove({ SaleId: req.params.saleId });
    if (!salesData) {
      return res.status(404).json({ message: 'Sales data entry not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
