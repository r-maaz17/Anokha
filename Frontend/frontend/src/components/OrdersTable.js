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
import axios from 'axios';
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

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const { Option } = Select;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

export default function OrderLists(props) {
    const [formData, setFormData] = useState({});
    const [editOrder, setEditOrder] = useState({})
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        getOrders();
    }, [])
    const getOrders = async () => {
        try {

            const { data } = await axios.get('http://localhost:8000/api/v1/orders');
            console.log(data);
            setOrders(data)
        }
        catch {
            console.log("Error in fething Orders")
        }
    }
    const [orders, setOrders] = useState([])
    const formRef = React.useRef(null);
    const Reject = (id) => {

        //



    }
    const setStatus = async (id, status) => {
        console.log(id);
        const toke = localStorage.getItem('userItem');
        const config = {
            headers: {
                'Authorization': toke, // Assuming it's a bearer token
            }
        };
        const payload = {
            status: status
        }
        const { data } = await axios.put(`${API_URLS.SET_ORDER_STATUS}${id}`, payload,config);
        getOrders();
    }


    const onFinish = (values) => {
        console.log(values);
    };
    const onReset = () => {
        formRef.current?.resetFields();
    };
    const onFill = () => {
        formRef.current?.setFieldsValue({
            note: 'Hello world!',
            gender: 'male',
        });
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (

        <div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Customer Email</StyledTableCell>
                            <StyledTableCell align="center">Order Date</StyledTableCell>
                            <StyledTableCell align="center">Total Bill</StyledTableCell>
                            <StyledTableCell align="center">Status</StyledTableCell>
                            <StyledTableCell align="center">Reject</StyledTableCell>
                            <StyledTableCell align="center">Approve</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((row) => (
                            row.Status === "Pending" && (
                                <StyledTableRow key={row.name}>
                                    {/* <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell> */}
                                    <StyledTableCell align="center">{row.userEmail}</StyledTableCell>
                                    <StyledTableCell align="center">{row.OrderDate}</StyledTableCell>
                                    <StyledTableCell align="center">{row.total}</StyledTableCell>
                                    <StyledTableCell align="center">{row.Status}</StyledTableCell>
                                    <StyledTableCell align="center"><Button onClick={() => setStatus(row._id, 'reject')} variant="contained" color="success">Reject</Button></StyledTableCell>
                                    <StyledTableCell align="center"><Button onClick={() => setStatus(row._id, 'approve')} variant="contained" color="error">Finish</Button></StyledTableCell>


                                </StyledTableRow>
                            )
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}