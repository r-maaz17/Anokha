const mongoose = require('mongoose');

const productReviewSchema = new mongoose.Schema({
  ReviewId: Number,
  ProductId: Number,
  CustomerId: Number,
  Rating: Number,
  ReviewText: String,
  DatePosted: Date,
});

module.exports = mongoose.model('ProductReview', productReviewSchema);
