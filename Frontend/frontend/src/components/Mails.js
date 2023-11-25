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
import { SearchBox } from './SmallComponents/Search';
import { API_URLS } from './apis/apiConfig';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextArea from 'antd/es/input/TextArea';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
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

export default function Mails(props) {
    const [isTable, setIsTable] = useState(true);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState({});
    const [messages, setMessages] = useState([])
    const formRef = React.useRef(null);
    React.useEffect(() => {
        getMessages();
    }, [])


    const getMessages = async () => {
        try {
            const token = localStorage.getItem('userItem');
            const config = {
                headers: {
                    'Authorization': token,
                },
            };
            const { data } = await axios.get(API_URLS.GET_ALL_MESSAGES, config);
            setMessages(data)
        }
        catch {
            console.log("Error in fething messages")
        }
    }

    const modalCicked = (row) => {
        setFormData(row);
        console.log(formData);
        showModal();


    }
    const setStatus = async (id, status) => {
        const payload = {
            status: status
        }
        const token = localStorage.getItem('userItem');
        const config = {
            headers: {
                'Authorization': token,
            },
        };
        const { data } = await axios.put(`${API_URLS.SET_MESSAGE_STATUS}${id}`, payload, config);
        getMessages()
    }
    const markSolved = () => {

    }
    const onFinish = (values) => {

        setIsModalOpen(false)

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
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (

        <div>
            <>

                <Modal title='See Issues' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                    {/* <Modal.Title></Modal.Title> */}
                    {loading ? "Loading..." : <Form
                        {...layout}
                        ref={formRef}
                        name="control-ref"
                        onFinish={onFinish}
                        style={{
                            maxWidth: 600,
                        }}
                    >
                        <Form.Item
                            name="User Email"
                            label="User Email"

                        >
                            <Input
                                value={formData.email}
                                defaultValue={formData.email}
                                readOnly

                            />
                        </Form.Item>
                        <Form.Item

                            name="name"
                            label="Name"
                        >
                            <Input
                                value={formData.name}
                                defaultValue={formData.name}
                                readOnly
                            />
                        </Form.Item>
                        <Form.Item
                            name="price"
                            label="Details"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <TextArea
                                value={formData.Message}
                                defaultValue={formData.Message}
                                style={{ height: '100px' }}
                                readOnly

                            />
                        </Form.Item>

                    </Form>}

                </Modal>
            </>
            <div style={{ marginBottom: 20 }}>
                {props.isSearchBox && <SearchBox />}
            </div>
            {isTable &&
                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>

                                    <StyledTableCell align="center">Name</StyledTableCell>
                                    <StyledTableCell align="center">Email</StyledTableCell>
                                    <StyledTableCell align="center">status</StyledTableCell>

                                    <StyledTableCell align="center">In Progress</StyledTableCell>
                                    <StyledTableCell align="center">Mark Solved</StyledTableCell>
                                    <StyledTableCell align="center">View More Details</StyledTableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {messages.map((row) => (
                                    <StyledTableRow key={row.name}>
                                        {/* <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell> */}
                                        <StyledTableCell align="center">{row.name}</StyledTableCell>
                                        <StyledTableCell align="center">{row.email}</StyledTableCell>
                                        <StyledTableCell align="center">{row.status}</StyledTableCell>
                                        <StyledTableCell align="center"><Button onClick={() => setStatus(row._id, 'in progress')} variant="contained" color="success">In Progress</Button></StyledTableCell>
                                        <StyledTableCell align="center"><Button onClick={() => setStatus(row._id, 'solved')} variant="contained" color="error">Solved</Button></StyledTableCell>
                                        <StyledTableCell align="center"><Button onClick={() => modalCicked(row)} variant="contained" color="success">View details</Button></StyledTableCell>


                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            }
        </div>
    );
}