const { verifyTokenMiddleware }= require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();
const CartController = require('../controller/cartController');

// edit cartItems in the cart
router.put('/cart/:id', verifyTokenMiddleware,CartController.editItemIntoCart);

// add cartItems in the cart
router.post('/cart', verifyTokenMiddleware,CartController.addItemIntoCart);

// delete cartItem of the cart
router.delete('/cart/:id',verifyTokenMiddleware,CartController.deleteFromCart)

// Delete the all cartItems
router.put('/delete-cart/',verifyTokenMiddleware,CartController.emptyCart);

//get all cartItems
//router.get('/cartitems', verifyTokenMiddleware,CartController.getCartItems);

router.get('/cartitems',CartController.getCartItems);
// get cartItem from cart of specific product Id
router.get('/cartitem/:productId', verifyTokenMiddleware,CartController.getCartItem);

module.exports = router;

