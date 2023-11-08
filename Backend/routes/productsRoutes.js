const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

// Create a new product
router.post('/products', productController.createProduct);

// Get all products
router.get('/products', productController.getProducts);

// Get a product by ProductId
router.get('/products/:productId', productController.getProductById);

// Update a product by ProductId
router.put('/products/:productId', productController.updateProduct);

// Delete a product by ProductId
router.delete('/products/:productId', productController.deleteProduct);

module.exports = router;
