import { useEffect } from "react";
import axios from "axios";
const CheckOutSuccess = ()=>{
   
    async function emptyCart() {
        const config = {
            headers: {
                'Authorization': `${localStorage.getItem('userItem')}`, // Assuming it's a bearer token
            }
        };
       
        const res = await axios.put('http://localhost:8000/api/v1/empty-cart/', config);
        return res.data;
    }
    useEffect(()=>{
        emptyCart();
    })
    return <h2></h2>
}
export default CheckOutSuccess;