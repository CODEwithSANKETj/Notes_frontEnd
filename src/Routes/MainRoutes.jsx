import {Routes,Route, useNavigate} from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import React, { useState } from 'react';
import User_page from '../pages/User_page';
import Create from '../pages/Create';
import Home from '../pages/Home';
import Navbar from './navbar';
function MainRoutes(){
    const token =localStorage.getItem('token')||''
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(token!==''?true:false);
    function handle_logout(){
        setIsLoggedIn(false)
        localStorage.removeItem('token');
        navigate('/')
    }
    function handle_login(){
        setIsLoggedIn(true)
    }
  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogin={handle_login}
        onLogout={handle_logout}
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login onLogin={handle_login}
        onLogout={handle_logout} />} />
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/user' element={<User_page/>}/>
            <Route path='/create' element={<Create/>}/>
        </Routes>
    </>
)}
export default MainRoutes