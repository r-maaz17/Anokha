const OnlineStorefront = require('../models/onlineStoreFront');

// Create a new online storefront
exports.createOnlineStorefront = async (req, res) => {
  try {
    const onlineStorefront = new OnlineStorefront(req.body);
    await onlineStorefront.save();
    res.status(201).json(onlineStorefront);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all online storefronts
exports.getOnlineStorefronts = async (req, res) => {
  try {
    const onlineStorefronts = await OnlineStorefront.find();
    res.status(200).json(onlineStorefronts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an online storefront by StoreFrontId
exports.getOnlineStorefrontById = async (req, res) => {
  try {
    const onlineStorefront = await OnlineStorefront.findOne({ StoreFrontId: req.params.storefrontId });
    if (!onlineStorefront) {
      return res.status(404).json({ message: 'Online storefront not found' });
    }
    res.status(200).json(onlineStorefront);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an online storefront by StoreFrontId
exports.updateOnlineStorefront = async (req, res) => {
  try {
    const onlineStorefront = await OnlineStorefront.findOneAndUpdate(
      { StoreFrontId: req.params.storefrontId },
      req.body,
      { new: true }
    );
    if (!onlineStorefront) {
      return res.status(404).json({ message: 'Online storefront not found' });
    }
    res.status(200).json(onlineStorefront);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an online storefront by StoreFrontId
exports.deleteOnlineStorefront = async (req, res) => {
  try {
    const onlineStorefront = await OnlineStorefront.findOneAndRemove({ StoreFrontId: req.params.storefrontId });
    if (!onlineStorefront) {
      return res.status(404).json({ message: 'Online storefront not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
