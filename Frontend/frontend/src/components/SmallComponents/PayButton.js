import axios from 'axios';
import { Button } from '@mui/material';
import getUserAuth from '../apis/utils';
const PayButton = ({cartItems}) =>{
    const userAuth = getUserAuth
    const handleCheckout = async() =>{
        const response = await axios.post('http://localhost:8000/api/v1/create-checkout-session',{
            cartItems:cartItems
        })
        window.location.href = response.data.url;
        console.log(response.data)

     };

    return (
        <>
        <Button onClick={()=>{handleCheckout()}} variant="contained" color="error">CheckOut</Button>
        </>
    )
}
export default PayButton;