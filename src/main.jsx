import React from "react";
import ReactDOM from "react-dom/client";
import PublicRoutes from "./PublicRoutes";
import Layout from "./Layout"
import { useContext } from "react";
import AuthContext from './context/AuthContext'
//localStorage.setItem("auth", false);
ReactDOM.createRoot(document.getElementById("root")).render(
  
  <React.StrictMode>
    <AuthContext.Provider value = {{ isAuth : localStorage.getItem("auth") }}>
    {localStorage.getItem("auth") == 'true' ? <Layout />  :  <PublicRoutes /> }
    </AuthContext.Provider>
   
 
  </React.StrictMode>
);
