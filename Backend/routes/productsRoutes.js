const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const { verifyAdminMiddleware }= require('../middleware/authMiddleware');
// Create a new product
router.post('/product/create', verifyAdminMiddleware,productController.createProduct);

// Get all products
router.get('/products',productController.getProducts);

// Get a product by ProductId
router.get('/product/:id',productController.getProductById);

// Update a product by ProductId
router.put('/product/update/:productId', verifyAdminMiddleware,productController.updateProduct);

// Delete a product by ProductId
router.delete('/product/delete/:productId', verifyAdminMiddleware,productController.deleteProduct);

module.exports = router;
