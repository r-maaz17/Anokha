import React from 'react';
import Navbar from './Navbar';
import { ProductCard } from './productCard';
import { useState } from 'react';
function MainPage() {
  const products = [
    {
      'title': "hp",
      'price':"100$",
      "imageSrc" : "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp",
      "quantityAvailable":"5",
      "rating":"5",
      "productUrl":"123131"
    },
    {
      'title': "hp",
      'price':"100$",
      "imageSrc" : "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp",
      "quantityAvailable":"5",
      "rating":"5",
      "productUrl":"123131"
    },
    {
      'title': "hp",
      'price':"100$",
      "imageSrc" : "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp",
      "quantityAvailable":"5",
      "rating":"5",
      "productUrl":"123131"
    },
    {
      'title': "hp",
      'price':"100$",
      "imageSrc" : "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp",
      "quantityAvailable":"5",
      "rating":"1",
      "productUrl":"123131"
    },
    {
      'title': "hp",
      'price':"100$",
      "imageSrc" : "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp",
      "quantityAvailable":"5",
      "rating":"2",
      "productUrl":"123131"
    },
    {
      'title': "hp",
      'price':"100$",
      "imageSrc" : "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp",
      "quantityAvailable":"5",
      "rating":"5",
      "productUrl":"123131"
    },
    {
      'title': "hp",
      'price':"100$",
      "imageSrc" : "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp",
      "quantityAvailable":"5",
      "rating":"5",
      "productUrl":"123131"
    },
  ]
  return (
    <div>
      <Navbar></Navbar>
    <section style={{backgroundColor: '#eee'}}>

<div class="container py-5">
    <div class="row">
      {products.map((product) => (

        // <div className="col-md-4">
       <ProductCard title={product.title} price={product.price} imageSrc={product.imageSrc} quantityAvailable={product.quantityAvailable} rating={product.rating}/>
       //</div>
))}
</div>
      </div>
    </section>
    </div>
  );
}

export default MainPage;
