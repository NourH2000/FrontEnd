import { Avatar, Button, Checkbox, CssBaseline, FormControlLabel, Grid, Link, Snackbar, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import Alert from '@mui/material/Alert';
import axios from "axios";

const Login = () => {

const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const [open, setOpen] = useState(false)
const [msg, setMsg] = useState("")
const login = () => {
    //console.log("am here")
    
  axios.post("http://localhost:8000/auth/login"
   ,{username :username , password :password})
   .then((response)=>{
    console.log("MSG :" , response.data.msg)
    if(response.data.connected == -1 || response.data.connected == 0 ){
      setOpen(true)
      setMsg(response.data.msg)
    }
  })
}


    return (
    <>
     <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            padding: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor:"green", 
          
          }}
        >
          
          
          <img src="/src/assets/Login.png" alt="horse" height="150" />
          <Typography component="h1" variant="h5">
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
          <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={(event, reason) => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
          <Alert onClose={(event, reason) => setOpen(false)} severity="error">
          <strong>{msg}</strong>
        </Alert>
        </Snackbar> 
            <TextField
              margin="normal"
              required
              fullWidth
              id="user"
              label="User name"
              name="username"
              onChange={(e)=>{setUsername(e.target.value)}}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              onChange={(e)=>{setPassword(e.target.value)}}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            
            <Button
              //type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={login}
            >
              Log in
            </Button>
            
          </Box>
        </Box>
      </Container>
    </>
    )
};

export default Login;
