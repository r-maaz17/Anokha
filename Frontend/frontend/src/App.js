import React from "react";
import MainPage from "./components/MainPage";
import { Button } from "antd";
import ReactDOM from 'react-dom';
import SignIn from "./components/SignIn";
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from "./components/Navbar";



function App() {
  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App;
