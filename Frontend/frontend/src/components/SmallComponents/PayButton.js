import axios from 'axios';
import { Button } from '@mui/material';
import getUserAuth from '../apis/utils';
const PayButton = ({cartItems}) =>{
    const userAuth = getUserAuth
    
    const handleCheckout = async() =>{
        console.log(cartItems)
        localStorage.setItem('userCartItems', JSON.stringify(cartItems));
        const response = await axios.post('http://localhost:8000/api/v1/create-checkout-session',{
            cartItems:cartItems
        })
        window.location.href = response.data.url;
        console.log(response.data)

     };
     
    return (
        <>
        <Button onClick={()=>{handleCheckout()}} variant="contained" color="error" style={{marginTop:'5%',marginLeft:'83%'}}>CheckOut</Button>
        </>
    )
}
export default PayButton;