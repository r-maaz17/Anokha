import React from "react";
import {
    MDBContainer,
    MDBInput,
    MDBBtn
} from 'mdb-react-ui-kit';
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { API_URLS } from "./apis/apiConfig";

const Verification = () => {

    const [code,setCode] = useState('');
    const navigate = useNavigate('');
    const [error,setError] = useState('');
    const handleSignUp = async ()=>{
        const payload = {
            Email: localStorage.getItem('userEmailForSignUp'),
            code: code
        }
        const response = await axios.post(API_URLS.CHECK_CODE,payload)
        if (response.status === 200){
            navigate('/signin')
        }
        else if(response.status == 429)
        {
            setError("Too Many Requests. Retry Later");
        }
        else if (response.status === 403){
            setError("Wrong code")
        }
    }
return (
    <div>
    <Navbar></Navbar>
    {error}
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
            <MDBInput wrapperClass='mb-4' label='Verification Code' id='form2' type='code' onChange={(e) => setCode(e.target.value)}/>
            <MDBBtn className="mb-4" onClick={handleSignUp}>Sign Up</MDBBtn>
        </MDBContainer>
        </div>
); 
}

export default Verification;