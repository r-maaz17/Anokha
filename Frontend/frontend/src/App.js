import React from "react";
import MainPage from "./components/MainPage";
import SignIn from "./components/SignIn";
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import SignUp from "./components/SignUp";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import ProductLists from "./components/ProductTable";
import UserLists from "./components/UserTable";
import OrderLists from "./components/OrdersTable";
import { Feedbacks } from "./components/Feedbacks";
import Mails from "./components/Mails";
import ProductPage from "./components/ProductPage";
import getUserAuth from "./components/apis/utils";
import CheckOut from "./components/CheckOut";
import CheckOutSuccess from "./components/CheckoutSuccess";
import Contact from "./components/Contact";
import Verification from "./components/Verification";
import { useState, useEffect } from "react";
function App() {

  const navigate = useNavigate('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const userAuth = await getUserAuth();
        if (userAuth.data.RoleId === "admin") {
          console.log("ADDDDDDMIN");
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        setIsAdmin(false);
      }
    };

    const fetchData = async () => {
      try {
        const data = await getUserAuth();
        if (data.status === "UnAuthorized") {
          navigate('/signin');
        } else if (data.status === "Authorized") {
          if (data.data.RoleId === "admin") {
            navigate('/admin/products');
          } else {
            navigate('/home');
          }
        }
      } catch (error) {
        navigate('/home');
      }
    };

    checkAdminStatus();
    fetchData();
  }, []);
  return (
    <div>

      <Routes>
        
        {console.log(isAdmin)}
        {isAdmin ? (
          <>
            <Route path="/admin/products" element={<Dashboard LeftIfi={<ProductLists isSearchBox={true} />} />} />
            <Route path="/admin/users" element={<Dashboard LeftIfi={<UserLists isSearchBox={true} />} />} />
            <Route path="/admin/orders" element={<Dashboard LeftIfi={<OrderLists isSearchBox={true} />} />} />
            <Route path="/admin/mail/all-mails" element={<Dashboard LeftIfi={<Mails isSearchBox={true} />} />} />
          </>
        ) : (
          <>
          <Route exact path='/product' element={<ProductPage />}>    </Route>
        <Route path='/checkout' element={<CheckOut />}>    </Route>
        <Route path='/contact' element={<Contact />}>    </Route>
        <Route path='/home' element={<MainPage />}>    </Route>
        <Route exact path='/signin' element={<SignIn />}>    </Route>
        <Route exact path='/signup' element={<SignUp />}>    </Route>
        <Route exact path='/verification' element={<Verification />}>    </Route>
          // Redirect to home for non-admin users
          <Route path="/admin/*" element={<Navigate to="/home" />} />
          </>
        )}
      </Routes>

    </div>
  );
}

export default App;
