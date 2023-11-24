const express = require('express')
const Stripe = require('stripe')
require('dotenv').config()

const stripe = Stripe(process.env.STRIPE_KEY);



// This function created new checkOut session
async function createCheckout(req, res) {
  const line_items = req.body.cartItems.map((item)=>{
    console.log(item)
    return {
      price_data: {
        currency: process.env.STRIPE_CURRENCY,
        product_data: {
          name: item.ProductName,
          images:[item.image],
          description:item.Description,
          metadata:{
            id:item._id
          }


        },
        unit_amount: item.Price * 100,
      },
      quantity: item.quantity,
    };
  });
  console.log(req.body.cartItems)
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/checkout`,
    });
  
    res.send({url:session.url})
}
module.exports = {
    createCheckout,
};