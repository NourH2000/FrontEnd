import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import moment from "moment";
import {
  Button,
  Typography,
  Paper,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { styled } from "@mui/material/styles";
import RotateLoader from "react-spinners/RotateLoader";
import ReplayIcon from '@mui/icons-material/Replay';

const FormTraining = () => {
  // item stack
  const ItemStack = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(0),

    color: theme.palette.text.secondary,
  }));

 
  
  const callModel = async (data) => {
    const res = await axios.post(
      "http://localhost:8000/models/QuantityTraining"
    );
  };



  // date loading
  const [dateLoading, setDateLoading] = useState(true);

  return (
    <>
      
      
   
    <Button variant="contained" sx={{  width : "100%" , height : "50px" , backgroundColor : "#113f67"}} startIcon={<ReplayIcon/>} onClick={callModel}>
      <h4>Lancer un nouveau entrainement</h4>
    </Button>
     

     
     </> 
   
  );
};

export default FormTraining;
