import React from 'react';
import Navbar from './Navbar';
import ProductCard from './productCard';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import getUserAuth from './apis/utils';
import { API_URLS } from './apis/apiConfig';

function MainPage() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([])
  const [status, setStatus] = useState('');

  const getProducts = async () => {
    try {

      const { data } = await axios.get(API_URLS.GET_PRODUCTS);
      setProducts(data)
    }
    catch {
      console.log("Error in fething Users")
    }
  }
  useEffect(() => {
    getProducts();
    try {
      getCartItems();
    }
    catch {

    }

  }, [])


  async function getCartItems() {
    try {
      // try {
      const token = localStorage.getItem('userItem');
      const config = {
        headers: {
          'Authorization': token,
        },
      };

      const { data } = await axios.get(API_URLS.GET_CARTITEMS, config)
      setCartItems(prevCartItems => data.userCart.cartItems);
      //console.log("response",data.userCart)
      return data;
    }
    catch {
      return []
    }
  }
  async function addToCart(_id) {
    const response = await getUserAuth();
    // console.log("RESPONSE",response)
    const token = response.data._id;
    const payload = {
      userId: token,
      productId: _id,
      status: "AddedIntoCart"
    }
    const toke = localStorage.getItem('userItem');
    const config = {
      headers: {
        'Authorization': toke, // Assuming it's a bearer token
      }
    };
    const result = await axios.post(API_URLS.ADD_INTO_CART, payload, config);
    setStatus("ADDED INTO CART")
    try {
      await getCartItems();
    }
    catch {

    }
    return result


  }

  return (
    <div>
      <Navbar cartLength={cartItems.length} isUser={true} />
      <div style={{ alignContent: 'center' }}>
        {status}
      </div>
      <section style={{ backgroundColor: '#eee' }}>

        <div class="container py-5">
          <div class="row">
            {products.map((product) => (

              <div className="col-md-4" style={{ marginBottom: 30 }}>
                <ProductCard title={product.ProductName} price={product.Price} image={product.image} quantityAvailable={product.StockQuantity} rating={4} _id={product._id} addToCart={addToCart} description={product.Description}/>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default MainPage;
