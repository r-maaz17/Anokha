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
import { API_URLS } from './apis/apiConfig';
import { useNavigate } from 'react-router-dom';
export default function ProductCard(props) {
    const navigate = useNavigate('');

    async function addToCart() {
        try {
            var resp = await getUserAuth();
            const token = resp.data._id;
            const data = await getCartItems();
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
                            ? {
                                ...item, quantity: item.quantity + quantityToAdd
                            }
                            : item
                    )
                };

                const isProductIdPresent = cartItems.some(item => item.productId === props._id);
                if (!isProductIdPresent) {
                    const newCart = {
                        userId: token,
                        productId: props._id,
                        status: "AddedIntoCart",
                        quantity: 1
                    }
                    data.userCart.cartItems.push(newCart)
                    console.log(data.userCart.cartItems)


                }
                else {
                    data.userCart.cartItems = updatedItems.cartItems
                }

                const res = await axios.put(`${API_URLS.ADD_INTO_CART}${data.userCart._id}`, data.userCart.cartItems, config);
                return res.data;
            }

            else if (data.data.status === 404) {
                //  console.log("YES")
                var userAuth = await getUserAuth();
                const token = userAuth.data._id;
                const newCart = {
                    userId: token,
                    cartItems: {
                        userId: token,
                        productId: props._id,
                        status: "AddedIntoCart",
                        quantity: 1
                    }
                }
                const res = await axios.post(API_URLS.CREATE_NEW_CART, newCart, config);
                return res.data;
            }
            window.location.reload();

            // const cartItem = await getCartItem(props._id)
            // if (cartItem !== null)
            // {
            //     cartItem.quantity = cartItem.quantity + 1;
            // }
            // const result = axios.post('http://localhost:8000/api/v1/cart',cart,config);
            //return result;

        }
        catch {
            navigate('/signin')
        }
    }
    async function getCartItems() {
        try {
            const token = localStorage.getItem('userItem');
            const config = {
                headers: {
                    'Authorization': token,
                },
            };

            const { data } = await axios.get(API_URLS.GET_CARTITEMS, config)
            console.log("response", data.userCart)
            return data;
        } catch {
            navigate('/signin')
        }
    }
    async function getCartItem(productId) {
        var response = await getUserAuth();
        const token = response.data._id;
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
        response = await axios.post(`${API_URLS.GET_CARTITEM}${productId}`, config);
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
                        <Typography component="legend">{props.Description}</Typography>
                        <br />

                        <div className='col'>
                            <Typography component="legend">Price : {props.price}</Typography>
                        </div>
                    </div>
               
                </div>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={addToCart} variant="contained" color="success">Add to Cart</Button>
                
            </CardActions>
        </Card>
    );
}