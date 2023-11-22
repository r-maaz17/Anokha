import React from "react";
import {
    MDBContainer,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
} from 'mdb-react-ui-kit';
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const SignUp = () => {
return (
    <div>
    <Navbar></Navbar>
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
  
            <MDBInput wrapperClass='mb-4' label='username' id='form3' type='username' />
            <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' />
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' />
    
            <MDBBtn className="mb-4">Sign Up</MDBBtn>

            <div className="text-center">
                <p>Already a Member? <Link to="/signin">Sign In</Link></p>
            </div>

        </MDBContainer>
        </div>
); 
}

export default SignUp;