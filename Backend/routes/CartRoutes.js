const { verifyTokenMiddleware }= require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();
const CartController = require('../controller/cartController');

 // Create a new customer
router.put('/cart', verifyTokenMiddleware,CartController.addItemIntoCart);
router.delete('/cart',verifyTokenMiddleware,CartController.deleteFromCart)
router.post('/cartitems', verifyTokenMiddleware,CartController.getCartItems);
module.exports = router;

