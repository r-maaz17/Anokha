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

export default function EventsLists(props) {
    const [isTable,setIsTable] = useState(true);
    const [formData, setFormData] = useState({});
    const [editProduct ,setEditProduct] = useState({})
    const [loading,setLoading] = useState(false);
    
    React.useEffect(() =>{
        getProducts();
    },[])
    // const actions = [
    //     {
    //         'name': 'Edit',
    //         'enable': 'true',
    //         'action': editProduct()
    //     },
    //     {
    //         'name': 'Delete',
    //         'enable': 'true',
    //         'action': delProduct()
    //     }
    // ]
    // const convertProducts = ()=> ({
        
    //     console.log(actions)
    // })
        
    
    const getProducts = async () => {
        try {

            const {data} = await axios.get('http://localhost:8000/api/v1/products');
            console.log(data);
            setProducts(data)
        }
        catch {
            console.log("Error in fething products")
        }
    }
    const [products,setProducts] = useState([])
    const formRef = React.useRef(null);
    const [isEdit, setIsEdit] = useState(false);
    const modalCicked = (id) => {
        
        showModal();
        setIsEdit(true);
        getProduct(id);

    }
    const getProduct = async (id)=>{
        try {
            setLoading(true);
            const {data} = await axios.get(`http://localhost:8000/api/v1/products/${id}`);
            console.log('data',data)
            setEditProduct(data)
            console.log('a',editProduct)
            setLoading(false);
          } catch (error) {
          }
    }
    const editData = async () => {
        try {
          const {data} = await axios.put(`http://localhost:8000/api/v1/products/${editProduct?._id}`, formData );
          getProducts()
    
        } catch (error) {}
      }
      const delProduct = async (id) => {
        try {
          const data = await axios.delete(`http://localhost:8000/api/v1/products/${id}`);
          getProducts();
        } catch (error) {}
      };
      const addProduct = async () => {
        try {
            const {data} = await axios.post(`http://localhost:8000/api/v1/products`, formData );
            getProducts()
      
          } catch (error) {}
      }
    const onGenderChange = (value) => {
        switch (value) {
            case 'male':
                formRef.current?.setFieldsValue({
                    note: 'Hi, man!',
                });
                break;
            case 'female':
                formRef.current?.setFieldsValue({
                    note: 'Hi, lady!',
                });
                break;
            case 'other':
                formRef.current?.setFieldsValue({
                    note: 'Hi there!',
                });
                break;
            default:
                break;
        }
    };
    const onFinish = (values) => {
        console.log(values);
        setIsEdit(false)
        editData();
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
        setIsEdit(false)
        if (isEdit){
        
        editData();}
        else if(!isEdit){
            addProduct();
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setIsEdit(false)
    };
    async function submit(e) {
        e.preventDefault();
    
        // console.log(formData.category);
        try {
          setLoading(true);
          const {data} = await axios.post("http://localhost:8000/api/v1/products",formData);
    
          setProducts([...products, data])
          setLoading(false);
          onFinish();
    
          // console.log("SIGNUP RESPONSE: ", data);
        } catch (err) {
          setLoading(false);
        }
      }
    return (

        <div>
            <>

                <Modal title={isEdit ? <h3>Edit Product</h3> : <h3>Add Product</h3>} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                    {/* <Modal.Title></Modal.Title> */}
                    {loading?"Loading..." : <Form
                        {...layout}
                        ref={formRef}
                        name="control-ref"
                        onFinish={onFinish}
                        style={{
                            maxWidth: 600,
                        }}
                    >
                        <Form.Item
                            name="productName"
                            label="Product Name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input
                            value={formData.ProductName}
                             defaultValue={isEdit ? editProduct?.ProductName : ""}
                             onChange={(e) =>
                                setFormData({ ...formData, ProductName: e.target.value })
                              }

                             />
                        </Form.Item>
                        <Form.Item

                            name="description"
                            label="Description"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input
                            value={formData.Description}
                             defaultValue={isEdit ? editProduct?.Description : ""}
                             onChange={(e) =>
                                setFormData({ ...formData, Description: e.target.value })
                              }

                            />
                        </Form.Item>
                        <Form.Item
                            name="price"
                            label="Price"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input
                            value={formData.Price}
                             defaultValue={isEdit ? editProduct?.Price : ""}
                             onChange={(e) =>
                                setFormData({ ...formData, Price: e.target.value })
                              }

                            />
                        </Form.Item>
                        <Form.Item
                            name="stockQuantity"
                            label="Stock Quantity"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input
                            value={formData.StockQuantity}
                            defaultValue={isEdit ? editProduct?.StockQuantity : ""}
                            onChange={(e) =>
                               setFormData({ ...formData, StockQuantity: e.target.value })
                             }
                            />
                        </Form.Item>
                        <Form.Item
                            name="lowStockThreshold"
                            label="Low Stock Threshold: "
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input
                            value={formData.LowStockThreshold}
                            defaultValue={isEdit ? editProduct?.LowStockThreshold : ""}
                            onChange={(e) =>
                               setFormData({ ...formData, LowStockThreshold: e.target.value })
                             }
                            />
                        </Form.Item>
                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                        >
                            {({ getFieldValue }) =>
                                getFieldValue('gender') === 'other' ? (
                                    <Form.Item
                                        name="customizeGender"
                                        label="Customize Gender"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                ) : null
                            }
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button onClick={isEdit ? editData : submit} type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                Reset
                            </Button>
                            <Button type="link" htmlType="button" onClick={onFill}>
                                Fill form
                            </Button>
                        </Form.Item>
                    </Form>}
                   
                </Modal>
            </>
            <div style={{  marginBottom: 20 }}>
            {props.isSearchBox && <SearchBox />}
            <Button style={{ marginLeft: "90%",}} variant="contained" color="primary" onClick={showModal}>
                Add
            </Button>
            </div>
            { isTable &&
            <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            
                            <StyledTableCell align="center">Product Name</StyledTableCell>
                            <StyledTableCell align="center">Description</StyledTableCell>
                            <StyledTableCell align="center">Price</StyledTableCell>
                            <StyledTableCell align="center">Stock</StyledTableCell>
                            <StyledTableCell align="center">Low Stock Threshold</StyledTableCell>
                            <StyledTableCell align="center">Edit</StyledTableCell>
                            <StyledTableCell align="center">Delete</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((row) => (
                            <StyledTableRow key={row.name}>
                                {/* <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell> */}
                                <StyledTableCell align="center">{row.ProductName}</StyledTableCell>
                                <StyledTableCell align="center">{row.Description}</StyledTableCell>
                                <StyledTableCell align="center">{row.Price}</StyledTableCell>
                                <StyledTableCell align="center">{row.StockQuantity}</StyledTableCell>
                                <StyledTableCell align="center">{row.LowStockThreshold}</StyledTableCell>
                                <StyledTableCell align="center"><Button onClick={()=>modalCicked(row._id)} variant="contained" color="success">Edit</Button></StyledTableCell>
                                <StyledTableCell align="center"><Button onClick={()=>delProduct(row._id)} variant="contained" color="error">Delete</Button></StyledTableCell>


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