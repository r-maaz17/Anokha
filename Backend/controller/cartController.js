const Cart = require('../models/Cart');

// Add item into cart
exports.addItemIntoCart = async (req, res) => {
  try {
    const cart = new Cart(req.body);
    await cart.save();
    res.status(201).json(cart);
  }
  catch {
    res.status(500).json({ error: 'server error' })
  }
};

// Create a Cart of a user
exports.createNewCart = async (body) => {
  try {
    const cart = new Cart(body);
    await cart.save();
    return cart
  }
  catch {
    return 'error';
  }
};

// edit Cart items of Cart
exports.editItemIntoCart = async (req, res) => {
  try {
    const cartItems = await Cart.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { cartItems: req.body } },
      { new: true } // This ensures that the updated document is returned
    );
    res.status(200).json(cartItems);
  }
  catch {

  }
};


// Empty the cart by removing all cart items in it
exports.emptyCart = async (req, res) => {
  // try {
    console.log("user ID ",req.user._id)
    const cartItems = await Cart.findOneAndUpdate(
      { userId: req.user._id },
      { $set: { cartItems: [] } },
      { new: true } // This ensures that the updated document is returned
    );
    res.status(200).json(cartItems);
  // }
  // catch {

  // }
};


// delete Cart Items from the cart
exports.deleteFromCart = async (req, res) => {
  try {


    // Find the index of the product in the cartItems array
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.user._id },
      { $pull: { cartItems: { productId: req.params.id } } },
      { new: true } // This ensures that the updated document is returned
    );

    if (updatedCart) {
      res.status(200).json({ message: 'Product removed from cart successfully', updatedCart });

    } else {
      res.status(404).json({ error: 'Product not found in cart' });
    }

  } catch (error) {
    console.error('Error removing product from cart:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}


//return all the cart of a user
exports.getCartItems = async (req, res) => {
  try {
console.log("user",req.user)
    const userCart = await Cart.findOne({ userId: req.user._id });
    if (!userCart) {
      return res.status(404).json({ error: 'User cart not found', status: 404 });
    }

    res.status(200).json({ userCart, status: 200 });

  } catch (error) {
    console.error('Error getting CartItems:', error.message);
    res.status(500).json({ error: 'Internal Server Error', status: 500 });
  }
}

// returns only one cartItem from the cart based on the productId
exports.getCartItem = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userCart = await Cart.findOne({ userId: req.user._id });
    if (!userCart) {
      return res.status(404).json({ status: 'not found', error: 'User cart not found' });
    }

    // Get all CartItems for the user
    const cartItems = userCart.cartItems;
    const cartItem = cartItems.find(item => item.productId === productId);


    res.status(200).json({ status: "found", cartItem: cartItem });
  } catch (error) {
    console.error('Error getting CartItem:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

