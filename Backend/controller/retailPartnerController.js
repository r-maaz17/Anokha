const RetailPartner = require('../models/retailPartner');

// Create a new retail partner
exports.createRetailPartner = async (req, res) => {
  try {
    const retailPartner = new RetailPartner(req.body);
    await retailPartner.save();
    res.status(201).json(retailPartner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all retail partners
exports.getRetailPartners = async (req, res) => {
  try {
    const retailPartners = await RetailPartner.find();
    res.status(200).json(retailPartners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a retail partner by PartnerId
exports.getRetailPartnerById = async (req, res) => {
  try {
    const retailPartner = await RetailPartner.findOne({ PartnerId: req.params.partnerId });
    if (!retailPartner) {
      return res.status(404).json({ message: 'Retail partner not found' });
    }
    res.status(200).json(retailPartner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a retail partner by PartnerId
exports.updateRetailPartner = async (req, res) => {
  try {
    const retailPartner = await RetailPartner.findOneAndUpdate(
      { PartnerId: req.params.partnerId },
      req.body,
      { new: true }
    );
    if (!retailPartner) {
      return res.status(404).json({ message: 'Retail partner not found' });
    }
    res.status(200).json(retailPartner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a retail partner by PartnerId
exports.deleteRetailPartner = async (req, res) => {
  try {
    const retailPartner = await RetailPartner.findOneAndRemove({ PartnerId: req.params.partnerId });
    if (!retailPartner) {
      return res.status(404).json({ message: 'Retail partner not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
