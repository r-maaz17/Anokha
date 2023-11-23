import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import getUserAuth from './apis/utils';
import axios from 'axios';
export default function ProductCard(props) {

    async function addToCart() {
        var resp = await getUserAuth();
        const token = resp.data.replace(/"/g, '');
        const data = await getCartItems();
       // console.log("Status = ",data.status)

       // console.log("DATA",data.userCart)
        
        const config = {
            headers: {
                'Authorization': `${localStorage.getItem('userItem')}`, // Assuming it's a bearer token
                'Content-Type': 'application/json', // Adjust the content type if needed
            }
        };
       
        if (data.status === 200) {
            const quantityToAdd = 1;
        
            const cartItems = data.userCart.cartItems;
            const updatedItems = {
                
                cartItems: cartItems.map(item =>
                    item.productId === props._id
                        ? { ...item, quantity: item.quantity + quantityToAdd
                         }
                        : item
                )
            };

            const isProductIdPresent = cartItems.some(item => item.productId === props._id);
            if (!isProductIdPresent){
            const newCart = {
                userId:token,
                productId:props._id,
                status:"AddedIntoCart",
                quantity:1
            }
            data.userCart.cartItems.push(newCart)
            console.log(data.userCart.cartItems)


}
else {
    data.userCart.cartItems = updatedItems.cartItems
}   

            const res = await axios.put(`http://localhost:8000/api/v1/cart/${data.userCart._id}`,  data.userCart.cartItems, config);
            return res.data;
        }

        else if (data.data.status === 404) {
          //  console.log("YES")
            var userAuth = await getUserAuth();
            const token = userAuth.data.replace(/"/g, '');
            const newCart = {
                userId: token,
                cartItems: {
                    userId: token,
                    productId: props._id,
                    status: "AddedIntoCart",
                    quantity: 1
                }
            }
            const res = await axios.post('http://localhost:3000/api/v1/cart', newCart, config);
            return res.data;
        }

        // const cartItem = await getCartItem(props._id)
        // if (cartItem !== null)
        // {
        //     cartItem.quantity = cartItem.quantity + 1;
        // }
       // const result = axios.post('http://localhost:8000/api/v1/cart',cart,config);
        //return result;


    }
    async function getCartItems() {
        // try {
        const token = localStorage.getItem('userItem');
        const config = {
            headers: {
                'Authorization': token,
            },
        };

        const {data} = await axios.get(`http://127.0.0.1:8000/api/v1/cartitems`, config)
      //console.log("response",data.userCart)
        return data;
    }
    async function getCartItem(productId) {
        var response = await getUserAuth();
        const token = response.data.replace(/"/g, '');
        const payload = {
            userId: token,
            productId: productId
        }
        const config = {
            headers: {
                'Authorization': `${localStorage.getItem('userItem')}`, // Assuming it's a bearer token
                'Content-Type': 'application/json', // Adjust the content type if needed
            }
        };
        response = await axios.post(`http://localhost:8000/api/v1/cartitem/${productId}`, config);
        if (response.status === 200) {
            return response.data.cartItem;
        }
        return null
    }
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 200 }}
                image={props.image}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.description}
                </Typography>
                <div className='row'>
                    <div className='col'>
                        <Typography component="legend">Rating</Typography>
                        <br />

                        <Rating
                            name="simple-controlled"
                            value={props.rating} readOnly
                        />
                    </div>
                    <div className='col'>
                        <div className='row'>
                            <div className='col'>
                                <Typography component="legend">Price</Typography>
                            </div>
                            <div className='col'>
                                <Typography component="legend">{props.price}</Typography>
                            </div>
                        </div>

                    </div>
                </div>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={addToCart}>Add to Cart</Button>
                <Button size="small" onClick={props.buy}>Buy</Button>
            </CardActions>
        </Card>
    );
}