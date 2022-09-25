import React  , { useState , useEffect ,  } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Publicroutes } from './routes';
import Layout from "./Layout";
import Login from './components/LogIn/Login';
const PublicRoutes = () => {
  return (
   
    <BrowserRouter>

  <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path={"*"} element={<Navigate to={"/login"} />} />
          </Routes>
          </BrowserRouter>
  ) 
  
}


export default PublicRoutes