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
import { useState } from 'react';
import getUserAuth from './apis/utils';
import axios from 'axios';
import PayButton from './SmallComponents/PayButton';
import { API_URLS } from './apis/apiConfig';

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
    const [cartItems, setCartItems] = useState([]);
    const [status, setStatus] = useState('');
    const [totalPrice, setTotalPrice] = useState(0)

    // React.useEffect(async () => {
    //     await getCartItems();
    //     console.log("CARTIEMS",cartItems)
    // }, [])

    async function getCartItems() {
        // try {
        const token = localStorage.getItem('userItem');
        const config = {
            headers: {
                'Authorization': token,
            },
        };
        // setLoading(true)
        const { data } = await axios.get(API_URLS.GET_CARTITEMS, config)
        setCartItems(prevCartItems => data.userCart.cartItems);
        // setLoading(false)
        //console.log("response",data.userCart)
        return data;
    }
    React.useEffect(() => {

        // try {
            getCartItems();
            localStorage.removeItem('userCartItems')
            
        // }
        // catch {

        // }
    }, []); // Assuming cartItems is a dependency
    // React.useEffect(() => {
    //     getTotalPrice();
    // }, [productsInCart]);
    const fetchData = async () => {
        const updatedProducts = [];
        setLoading(true)
        await Promise.all(
            cartItems.map(async (element) => {
                const product = await getProduct(element.productId);
                product.quantity = element.quantity;
                updatedProducts.push(product);
            })
        );

        setProductsInCart(updatedProducts);
        setLoading(false)
        getTotalPrice();
    };

    React.useEffect(() => {
        try {


            fetchData();
           // getTotalPrice();
            // getTotalPrice();
        }
        catch {

        }
    }, [cartItems]); // Assuming cartItems is a dependenc


    const getProduct = async (id) => {
        try {
            const product = await axios.get(`${API_URLS.GET_PRODUCT}${id}`)
            return product.data;
        }
        catch {

        }
    }

    async function removeFromCart(id) {
        try {
            var userId = await getUserAuth();
            console.log("USERD=", userId)
            userId = userId.data._id;
            const token = localStorage.getItem('userItem');
            const config = {
                headers: {
                    'Authorization': token,
                },
            };
            const payload = {
                userId: userId,
                productId: id,
            }
            console.log(config);
            const response = await axios.delete(`${API_URLS.DELETE_FROM_CART}${id}`, config)
            if (response.status === 200) {
                setStatus("DELETED FROM CART");
                getCartItems();
                await getTotalPrice()
            }

        }
        catch {

        }
    }
    async function getTotalPrice() {
        var total = 0
        console.log(productsInCart)
        productsInCart.map((row) => {
            total = total + parseInt(row.Price)
        })
        console.log(total)
        setTotalPrice(total)
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
                            <StyledTableCell align="center">Total</StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                         console.log(productsInCart)   
                        }
                        {

                        productsInCart.map((row) => (
                            <StyledTableRow key={row.name}>
                                {/* <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell> */}
                                <StyledTableCell align="center">{row.ProductName}</StyledTableCell>
                                <StyledTableCell align="center">{row.Description}</StyledTableCell>
                                <StyledTableCell align="center">{row.Price}</StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                                <StyledTableCell align="center"><Button onClick={() => removeFromCart(row._id)} variant="contained" color="success">Remove From Cart</Button></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                    <StyledTableRow>
                    <StyledTableCell align="center"></StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
        { loading ? " ": 
                    <StyledTableCell align="center" style={{backgroundColor:'silver'}}><b>
                    Total Price::{totalPrice}RS</b></StyledTableCell>}
                    <StyledTableCell align="center"></StyledTableCell>


                </StyledTableRow>
                </Table>
                
            </TableContainer>

            <PayButton cartItems={productsInCart} />
        </div>
    );
}