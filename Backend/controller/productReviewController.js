const ProductReview = require('../models/productReview');

// Create a new product review
exports.createProductReview = async (req, res) => {
  try {
    const productReview = new ProductReview(req.body);
    await productReview.save();
    res.status(201).json(productReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all product reviews
exports.getProductReviews = async (req, res) => {
  try {
    const productReviews = await ProductReview.find();
    res.status(200).json(productReviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a product review by ReviewId
exports.getProductReviewById = async (req, res) => {
  try {
    const productReview = await ProductReview.findOne({ ReviewId: req.params.reviewId });
    if (!productReview) {
      return res.status(404).json({ message: 'Product review not found' });
    }
    res.status(200).json(productReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product review by ReviewId
exports.updateProductReview = async (req, res) => {
  try {
    const productReview = await ProductReview.findOneAndUpdate(
      { ReviewId: req.params.reviewId },
      req.body,
      { new: true }
    );
    if (!productReview) {
      return res.status(404).json({ message: 'Product review not found' });
    }
    res.status(200).json(productReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a product review by ReviewId
exports.deleteProductReview = async (req, res) => {
  try {
    const productReview = await ProductReview.findOneAndRemove({ ReviewId: req.params.reviewId });
    if (!productReview) {
      return res.status(404).json({ message: 'Product review not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
