import React  , { useState , useEffect ,  } from 'react'
import { Navigate } from "react-router-dom";

import Layout from "./Layout";

const ProtectedRoute = () => {
    const [authenticated, setauthenticated] = useState(null);
    useEffect(() => {
      const loggedInUser = localStorage.getItem("authenticated");
      if (loggedInUser) {
        setauthenticated(loggedInUser);
      } 
    }, []);
      if (!authenticated) {
        console.log(authenticated)
        return <>hello am not auth</>
      }else {
        console.log(authenticated)

  return (
    <Layout />
  )
}
}

export default ProtectedRoute