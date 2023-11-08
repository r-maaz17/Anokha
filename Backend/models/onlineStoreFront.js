const mongoose = require('mongoose');

const onlineStorefrontSchema = new mongoose.Schema({
  StoreFrontId: Number,
  StoreName: String,
  WebsiteUrl: String,
  IntegrationKey: String,
});

module.exports = mongoose.model('OnlineStoreFront', onlineStorefrontSchema);
