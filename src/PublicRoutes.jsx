import React  , { useState , useEffect ,  } from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import { Publicroutes } from './routes';
import Layout from "./Layout";

const PublicRoutes = () => {
  
  return (
  <Routes>
            {Publicroutes.map((item, Index) => (
              <Route
                exact
                Key={Index}
                path={item.path}
                element={<item.component />}
              />
            ))}
            <Route path={"*"} element={<Navigate to={"/login"} />} />
          </Routes>
  )
}


export default PublicRoutes