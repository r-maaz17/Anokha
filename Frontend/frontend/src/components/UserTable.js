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

export default function UserLists(props) {
    const [formData, setFormData] = useState({});
    const [editUser ,setEditUser] = useState({})
    const [loading,setLoading] = useState(false);
    
    React.useEffect(() =>{
        getUsers();
    },[])
    const getUsers = async () => {
        try {

            const {data} = await axios.get('http://localhost:8000/api/v1/users');
            console.log(data);
            setUsers(data)
        }
        catch {
            console.log("Error in fething Users")
        }
    }
    const [Users,setUsers] = useState([])
    const formRef = React.useRef(null);
    const [isEdit, setIsEdit] = useState(false);
    const modalCicked = (id) => {
        
        showModal();
        setIsEdit(true);
        getUser(id);
        
        


    }
    const getUser = async (id)=>{
        try {
            setLoading(true);
            const {data} = await axios.get(`http://localhost:8000/api/v1/users/${id}`);
            console.log('data',data)
            setEditUser(data)
            console.log('a',editUser)
            setLoading(false);
          } catch (error) {
          }
    }
    const editData = async () => {
        try {
          const {data} = await axios.put(`http://localhost:8000/api/v1/users/${editUser?._id}`, formData );
          getUsers()
          setIsEdit(false)
    
        } catch (error) {}
      }
      const delUser = async (id) => {
        try {
          const data = await axios.delete(`http://localhost:8000/api/v1/users/${id}`);
          getUsers();
        } catch (error) {}
      };
      const addUser = async () => {
        try {
            console.log("USer added",data);
            const {data} = await axios.post(`http://localhost:8000/api/v1/users`, formData );
            console.log("USer added",data);
            getUsers()
      
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
        setIsEdit(false)
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
            addUser();
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
          const {data} = await axios.post("http://localhost:8000/api/v1/users",formData);
    
          setUsers([...Users, data])
          setLoading(false);
          onFinish();
          setIsEdit(false)
          setIsModalOpen(false);
          // console.log("SIGNUP RESPONSE: ", data);
        } catch (err) {
          setLoading(false);
        }
      }
    return (

        <div>
            <>

                <Modal title={isEdit ? <h3>Edit User</h3> : <h3>Add User</h3>} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

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
                            name="Username"
                            label="Enter Username"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input
                            value={formData.Username}
                             defaultValue={isEdit ? editUser?.Username : ""}
                             onChange={(e) =>
                                setFormData({ ...formData, Username: e.target.value })
                              }

                             />
                        </Form.Item>
                        <Form.Item

                            name="Password"
                            label="Enter Password"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input
                            value={formData.Password}
                             defaultValue={isEdit ? editUser?.Password : ""}
                             onChange={(e) =>
                                setFormData({ ...formData, Password: e.target.value })
                              }

                            />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Enter Email"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input
                            value={formData.Email}
                             defaultValue={isEdit ? editUser?.Email : ""}
                             onChange={(e) =>
                                setFormData({ ...formData, Email: e.target.value })
                              }

                            />
                        </Form.Item>
                        <Form.Item
                            name="roleId"
                            label="Enter Role"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input
                            value={formData.RoleId}
                             defaultValue={isEdit ? editUser?.RoleId : ""}
                             onChange={(e) =>
                                setFormData({ ...formData, RoleId: e.target.value })
                              }

                            />
                        </Form.Item>
                     
                        
                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.RoleId !== currentValues.RoleId}
                        >
                            {({ getFieldValue }) =>
                                getFieldValue('RoleId') === 'admin' ? (
                                    <Form.Item
                                        name="admin"
                                        label="admin"
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
            <div>
            {props.isSearchBox && <SearchBox />}
            <Button style={{ marginLeft: "90%", marginBottom: 20 }} variant="contained" color="primary" onClick={showModal}>
                Add
            </Button>
            </div>
            
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            
                            <StyledTableCell align="center">Username</StyledTableCell>
                            <StyledTableCell align="center">Password</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">RoleId</StyledTableCell>
                            <StyledTableCell align="center">Edit</StyledTableCell>
                            <StyledTableCell align="center">Delete</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Users.map((row) => (
                            <StyledTableRow key={row._id}>
                                {/* <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell> */}
                                <StyledTableCell align="center">{row.Username}</StyledTableCell>
                                <StyledTableCell align="center">{row.Password}</StyledTableCell>
                                <StyledTableCell align="center">{row.Email}</StyledTableCell>
                                <StyledTableCell align="center">{row.RoleId}</StyledTableCell>
                                <StyledTableCell align="center"><Button onClick={()=>modalCicked(row._id)} variant="contained" color="success">Edit</Button></StyledTableCell>
                                <StyledTableCell align="center"><Button onClick={()=>delUser(row._id)} variant="contained" color="error">Delete</Button></StyledTableCell>


                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}