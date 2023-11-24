import { useEffect } from "react";
import axios from "axios";
import { API_URLS } from "./apis/apiConfig";
import getUserAuth from "./apis/utils";
const CheckOutSuccess = ()=>{
   
    async function emptyCart() {
        const config = {
            headers: {
                'Authorization': `${localStorage.getItem('userItem')}`, // Assuming it's a bearer token
            }
        };
       
        const res = await axios.put(API_URLS.EMPTY_CART,{}, config);
        return res.data;
    }
    const createOrder = async()=>{
        const storedUser = localStorage.getItem('userCartItems');
        const item = JSON.parse(storedUser);
        var total = 0;
        item.map((row) => {
            total = total + parseInt(row.Price)
        })
        const userItem = localStorage.getItem('userItem');
        const orderPayload = { 
            total: total
        }
        const token = localStorage.getItem('userItem');
        const config = {
                headers: {
                    'Authorization': token,
                },
            };
        const response = await axios.post('http://localhost:8000/api/v1/order/create',orderPayload,config);
        return response.data;
    }
    useEffect(()=>{
        const response = createOrder();
        emptyCart();
    })
    return <h2></h2>
}
export default CheckOutSuccess;