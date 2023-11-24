const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const { verifyTokenMiddleware }= require('../middleware/authMiddleware');
// Create a new product
router.post('/product/create', verifyTokenMiddleware,productController.createProduct);

// Get all products
router.get('/products', productController.getProducts);

// Get a product by ProductId
router.get('/product/:id', productController.getProductById);

// Update a product by ProductId
router.put('/product/update/:productId', verifyTokenMiddleware,productController.updateProduct);

// Delete a product by ProductId
router.delete('/product/delete/:productId', productController.deleteProduct);

module.exports = router;
