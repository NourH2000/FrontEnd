import React  , { useState, useEffect }  from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Avatar, Button, Checkbox, CssBaseline, FormControlLabel, Link, Snackbar, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Alert from '@mui/material/Alert';
import axios, { Axios } from "axios";
import { useNavigate , Navigate} from "react-router-dom";
import { styled } from '@mui/system';

axios.defaults.withCredentials = true

const Login = () =>{
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const [open, setOpen] = useState(false)
const [msg, setMsg] = useState("")

//Navigation
const navigate = useNavigate();

const navigateToTheOverview = () => {
  navigate("/overview")
  }


// Login function 

const login = () => {
  //console.log("am here")
  
axios.post("http://localhost:8000/auth/login"
 ,{username :username , password :password})
 .then((response)=>{
  console.log("MSG :" , response.data.msg)
  if(response.data.connected == -1 || response.data.connected == 0 ){
    setOpen(true)
    setMsg(response.data.msg)
    //setauthenticated(false)
    localStorage.setItem("auth", false);
    
  }else{
    //setauthenticated(true)
  
    localStorage.setItem("auth", true);
    navigateToTheOverview()
    
  }
})
}

const LayoutContainer = styled('div')(() => ({
  height: '100%',
  overflow: 'hidden',
  width: '100%',
  
  marginTop : '5%'
}));
  return (
    <Grid Container sx={{marginTop : '5%'}}>
    
      <Box
        sx={{
          boxShadow: 1,
        
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          p: 1,
          m: 1,
          borderRadius: 2,
          textAlign: 'center',
          alignContent : 'center',
          fontSize: '0.875rem',
          fontWeight: '700',
          width :'30%',
          marginLeft : 'auto' ,  
          marginRight : 'auto',
          paddingTop : 5,
          paddingBottom : 15

          
          
        }}
      >
          <Typography component="h1" variant="h4" sx={{ margin : 4}}>
            Log in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1  , width :'90%' , marginLeft : 'auto' ,  marginRight : 'auto'}}>
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
              sx={{ mt: 10, mb: 2 , width :'70%'}}
              onClick={login}
            >
              Log in
            </Button>
            
          </Box>
      </Box>
      
    </Grid>
  );
}
export default Login