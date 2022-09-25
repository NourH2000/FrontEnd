import React from "react";
import { createContext } from "react";

const AuthContext = createContext({
    'isAuth': false
})

export default AuthContext;