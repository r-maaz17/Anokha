import React from "react";
import MainPage from "./components/MainPage";
import { Button } from "antd";
import ReactDOM from 'react-dom';
import SignIn from "./components/SignIn";
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from "./components/Navbar";
import { ProductCard } from "./components/productCard";
import SignUp from "./components/SignUp";
import { BrowserRouter , Routes , Route} from 'react-router-dom';

function App() {
  return (
    <div>
    
      <Routes>
      
      <Route exact path='/' element={<MainPage />}>    </Route>
      <Route exact path='/signin' element={<SignIn />}>    </Route>
      <Route exact path='/signup' element={<SignUp />}>    </Route>
      
      
      </Routes>
    
    </div>
  );
}

export default App;
