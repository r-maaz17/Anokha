import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import './ContactUs.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getUserAuth from "./apis/utils";
import { API_URLS } from "./apis/apiConfig";
import Navbar from "./Navbar";
const Contact = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const handleNameChange = (event) => {
        setName(event.target.value);
      };
      const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };
      const handleMessageChange = (event) => {
        setMessage(event.target.value);
      };
      const createNewMessage = async()=> {
        const data = await getUserAuth();
        const id = data.data._id;
        const payload = {
            userId:id,
            name:name,
            email:email,
            Message:message
        }
        const response = await axios.post(API_URLS.CREATE_NEW_MESSAGE,payload)
        if (response.status === 200)
        {

        }
      }

    useEffect(() => {


    }, []);
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
        <div className="Main_Page">
             
            <div className="one2_portion">
                <h2 className="Contact_Us_Heading">Contact Us :- </h2>
                <h5 className="Contact_Us_Paragaraph">
                    If you are facing any issues or have any complain. We are 
                    here to help you. Create your issue and we will get back to
                    you soon on Email.
                </h5>
            </div>
            <div className="contact2_portion">
                <div>
                    <h2 style={{ }}>
                        Create Ticket
                    </h2>
                    <form >
                        <div className="Name_Field">
                            <h4 className="namecontact_label">Your Name</h4>
                            <input
                                className="name_input"
                                type="text"
                                placeholder="Enter your Name"
                                value={name}
                                required
                                name="customer"
                                onChange={handleNameChange}
                            />
                        </div>
                        <div className="Name_Field">
                            <h4 className="emailcontact_label">Your Email</h4>
                            <input
                                className="name_input"
                                type="email"
                                placeholder="Enter your Email"
                                value={email}
                                required
                                name="email"
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className="Name_Field">
                            <h4 className="message_label">Your Issue</h4>
                            <textarea
                                className="name_input"
                                type="text"
                                placeholder="Enter Your issue details."
                                name="message"
                                rows={2}
                                required
                                value={message}
                                style={{ fontFamily: "sans-serif", paddingTop: "4px",height: "100px" }}
                                onChange={handleMessageChange}
                            />
                        </div>

                        <div className="button">
                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: "red",
                                    fontWeight: "bold",
                                    paddingLeft: "6%",
                                    paddingRight: "6%",
                                    borderRadius: "5px",
                                    textTransform: "uppercase",
                                }}
                                onClick={() => {
                                    navigate("/");
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: "red",
                                    fontWeight: "bold",
                                    paddingLeft: "6%",
                                    paddingRight: "6%",
                                    borderRadius: "5px",
                                    textTransform: "uppercase",
                                }}
                            onClick={createNewMessage}>
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Contact;
