import React from 'react';
import { useState } from 'react';
import { API_URLS } from './apis/apiConfig';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    MDBContainer,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
}

    from 'mdb-react-ui-kit';
import Navbar from './Navbar';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const SignIn = () => {
    const [error,setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            console.log(email,password,"user")
          const response = await axios.post(API_URLS.SIGN_IN, {
            email: email,
            password: password,
          });
    
          // Log the JSON response
          console.log('Response:', response.data);
          if (response.status == 200){
            localStorage.setItem('userItem',response.data.token);
            if (response.data.RoleId === "admin")
            {

              navigate('/admin/products')
            }
            else{
                navigate('/home')
            }
          }

          else{
            setError("Error");
          }
        } catch (error) {
            setError('Something is wrong');
          console.error('Error:', error.response.data);
        }
      }
    return (
        <div>
            <Navbar />
            <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
                {error}
                <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' onChange={(e) => setEmail(e.target.value)} />
                <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={(e) => setPassword(e.target.value)} />

                <Button className="mb-4" variant="contained" color="primary" onClick={handleLogin}>Sign in</Button>

                <div className="text-center">
                    <p>Not a member? <Link to="/signup">Register</Link></p>
                </div>

            </MDBContainer>
        </div>
    );
}

export default SignIn;