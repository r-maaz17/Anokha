const express = require('express');
const router = express.Router();
const productReviewController = require('../controller/productReviewController');

// Create a new product review
router.post('/productReviews', productReviewController.createProductReview);

// Get all product reviews
router.get('/productReviews', productReviewController.getProductReviews);

// Get a product review by ReviewId
router.get('/productReviews/:reviewId', productReviewController.getProductReviewById);

// Update a product review by ReviewId
router.put('/productReviews/:reviewId', productReviewController.updateProductReview);

// Delete a product review by ReviewId
router.delete('/productReviews/:reviewId', productReviewController.deleteProductReview);

module.exports = router;
