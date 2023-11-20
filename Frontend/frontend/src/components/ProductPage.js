import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Single from './ProductSingle';

import axios from "axios";
// import User from "../apicall/products";

function SingleProduct() {
  // const [iuser, setiUsers] = useState(User);

  const [productsArray, setProductsArray] = useState([])
  const { id } = useParams();

  const getProduct = async() => {
      try{
          let {data} = await axios.get(`http://localhost:8000/product/${id}`)
          setProductsArray(data);
          
      } catch(err) {
          console.log("Error", err);
      }
  }

  useEffect(() => {
    getProduct()
}, [])


  const [foundItem, setFoundItem] = useState(null);
  const [loading, setLoading] = useState(false)

  // const findItemById = (id) => {
  //   const item = productsArray.find((item) => item.id == id);
  //   setFoundItem(item);
  // };



  return (
    <Container className="gap py-10">
        
          <Single
        name={"NAME"}
        category={"Category"}
        rating={"RATING:4.3"}
        description={"DESCRIPTION"}
        price={"100$"}
        picture={"https://anokhia.s3.amazonaws.com/2.PNG"}
        slug={"SLUG"}

      />
    </Container>
  );
}

export default SingleProduct;
