const Cart = require('../models/Cart');

// Create a new user
exports.addItemIntoCart = async (req, res) => {
  try {
    const { userId, productId, status } = req.body;
    // Find the user's cart or create a new one if it doesn't exist
    let userCart = await Cart.findOneAndUpdate({ userId: userId },req.body);
  }
  catch{

  }
};


exports.deleteFromCart = async(req,res)=>{
  try {
    const { userId, productId } = req.body;

    // Find the user's cart
    let userCart = await Cart.findOne({ userId: userId });

    if (userCart) {
        // Find the index of the product in the cartItems array
        const productIndex = userCart.cartItems.findIndex(item => item.productId === productId);

        if (productIndex !== -1) {
            // Product found, remove it from the cartItems array
            userCart.cartItems.splice(productIndex, 1);
            // Save the updated cart to the database
            await userCart.save();

            res.status(200).json({ message: 'Product removed from cart successfully', userCart });
        } else {
            res.status(404).json({ error: 'Product not found in cart' });
        }
    } else {
        res.status(404).json({ error: 'User cart not found' });
    }
} catch (error) {
    console.error('Error removing product from cart:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
}

}

exports.getCartItems = async (req,res) => {
    try {
    
        // Find the user's cart
        console.log("USER DSAD,",req.body.userId)
        const userCart = await Cart.findOne({ userId:req.body.userId });
        if (!userCart) {
          return res.status(404).json({ error: 'User cart not found' });
        }
    
        // Get all CartItems for the user
        const cartItems = userCart.cartItems;
    
        res.status(200).json({ cartItems });
      } catch (error) {
        console.error('Error getting CartItems:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
      } 
}

