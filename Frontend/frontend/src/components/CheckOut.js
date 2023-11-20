import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { Modal, Form, Input, Select } from 'antd';
import { useState } from 'react';
import getUserAuth from './apis/utils';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}


export default function CheckOut(props) {
    const [productsInCart, setProductsInCart] = useState([]);
    const [loading, setLoading] = useState(false);
    //const [cartItems, setCartItems] = useState([]);
    const [status, setStatus] = useState('');

    // React.useEffect(async () => {
    //     await getCartItems();
    //     console.log("CARTIEMS",cartItems)
    // }, [])
   
    const cartItems = [
        {
            "userId": "6558b1da1c1f38c9c43a61f8",
            "productId": "6559d1b9bb7b92b477d66fd7",
            "status": "AddedIntoCart",
            "quantity": 1
        },
        {
            "userId": "6558b1da1c1f38c9c43a61f8",
            "productId": "6559d1c8bb7b92b477d66fda",
            "status": "AddedIntoCart",
            "quantity": 1
        },
        {
            "userId": "6558b1da1c1f38c9c43a61f8",
            "productId": "6559d1d2bb7b92b477d66fdd",
            "status": "AddedIntoCart",
            "quantity": 1
        }
    ]
    
    
    React.useEffect(() => {
        const fetchData = async () => {
            const updatedProducts = [];
            
            await Promise.all(
                cartItems.map(async (element) => {
                    const product = await getProduct(element.productId);
                    updatedProducts.push(product);
                })
            );
        
            setProductsInCart(updatedProducts);
        };
        fetchData();
    }, [cartItems]); // Assuming cartItems is a dependency
    
        
    React.useEffect(async() => {

       
    //    const fetchData = async () => {
    //        console.log("CART ITEMs,",cartItems)
    //        cartItems.map((element) => {
    //            console.log(element.productId)

    //            const product = getProduct(element.productId);
    //            setCartItems(prevProductsInCart => [product]);
    //        }
    //        )
    //    };

    //    fetchData();
   }, [])
    async function getCartItems() {
        // try {
        const a = await getUserAuth();
        const userId = a.data.replace(/"/g, '');
        const payload = {
            userId: userId,
        }
        const token = localStorage.getItem('userItem');
        const config = {
            headers: {
                'Authorization': token,
            },
        };

        const response = await axios.post(`http://127.0.0.1:8000/api/v1/cartitems`, payload, config)
        //setCartItems(response.data);
        // } catch (error) {
        //   setCartItems([]);

        // }
    }
    
    const getProduct = async (id) => {
        const product = await axios.get(`http://localhost:8000/api/v1/product/${id}`)
        return product.data;
    }

    async function removeFromCart(id) {
        var userId = await getUserAuth();
        userId = userId.replace(/"/g, '');
        const config = {
            headers: {
                'Authorization': `${localStorage.getItem('userItem')}`,
                'Content-Type': 'application/json',
            }
        }
        const payload = {
            userId: userId,
            productId: id,
        }
        const response = await axios.delete(`http://localhost:8000/api/v1/${id}`,)
        if (response.status === 200) {
            setStatus("DELETED FROM CART");
            //getCartItems();
        }
    }

    async function submit(e) {
        // e.preventDefault();

        // // console.log(formData.category);
        // try {
        //   setLoading(true);
        //   //const {data} = await axios.post("http://localhost:8000/api/v1/orders",formData);

        //   setOrders([...Orders, data])
        //   setLoading(false);
        //   onFinish();

        //   // console.log("SIGNUP RESPONSE: ", data);
        // } catch (err) {
        //   setLoading(false);
        // }
    }
        return (

        <div>


            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>

                            <StyledTableCell align="center">Product Name</StyledTableCell>
                            <StyledTableCell align="center">Product Description</StyledTableCell>
                            <StyledTableCell align="center">Product Price</StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productsInCart.map((row) => (
                            <StyledTableRow key={row.name}>
                                {/* <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell> */}
                                <StyledTableCell align="center">{row.ProductName}</StyledTableCell>
                                <StyledTableCell align="center">{row.Description}</StyledTableCell>
                                <StyledTableCell align="center">{row.Price}</StyledTableCell>
                                <StyledTableCell align="center"><Button onClick={() => removeFromCart(row._id)} variant="contained" color="success">Remove From Cart</Button></StyledTableCell>


                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button style={{marginLeft:50, }} variant="contained" color="error">Checkout</Button>
        </div>
    );
}