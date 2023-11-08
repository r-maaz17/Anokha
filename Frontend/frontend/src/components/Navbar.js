import React from 'react';
import { Layout, Menu, Button } from 'antd';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { Link, useNavigate } from 'react-router-dom';

const { Header } = Layout;

function Navbar() {
  const navigate = useNavigate();

  const handleClick = (path) => {
    // Use the navigate function to go to a different route
    navigate(path);
  };
  

  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">ANOKHA</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </ul>

          <li class="nav-item">
            <Button className="btn btn-primary" onClick={() => handleClick('/signup')}>Sign Up</Button>
          </li>
          <li class="nav-item">
            <Button className="btn btn-primary" onClick={() => handleClick('/signin')}>Sign in</Button>
          </li>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
