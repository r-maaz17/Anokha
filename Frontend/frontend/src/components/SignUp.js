import React from "react";
import {
    MDBContainer,
    MDBInput,
    MDBBtn
} from 'mdb-react-ui-kit';
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { API_URLS } from "./apis/apiConfig";

const SignUp = () => {

    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate('')
    const payload = {
        Username: username,
        Email: email,
        Password: password
    }
    const handleSignUp = async ()=>{
        const response = await axios.post(API_URLS.SIGN_UP,payload)
        if (response.status === 200)
        {
            localStorage.setItem('userEmailForSignUp',email)
            navigate('/verification');
        }
    }

return (
    <div>
    <Navbar></Navbar>
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
  
            <MDBInput wrapperClass='mb-4' label='username' id='form3' type='username' onChange={(e) => setUsername(e.target.value)}/>
            <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' onChange={(e) => setEmail(e.target.value)}/>
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={(e) => setPassword(e.target.value)}/>
            <MDBBtn className="mb-4" onClick={handleSignUp}>Sign Up</MDBBtn>

            <div className="text-center">
                <p>Already a Member? <Link to="/signin">Sign In</Link></p>
            </div>

        </MDBContainer>
        </div>
); 
}

export default SignUp;