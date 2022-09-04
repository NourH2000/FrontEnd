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
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReplayIcon from '@mui/icons-material/Replay';

const FormTreatementNew = () => {
  // item stack
  const ItemStack = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(0),

    color: theme.palette.text.secondary,
  }));

 // get the max and min dates of quantity tmp table
  const GetDates = async () => {
    
    await axios
      .get("http://localhost:8000/models/getMaxMindateQTMP")
      .then((response) => {
        const data = { date_debut: response.data.minDate, date_fin: response.data.maxDate , auto:'Oui' };
        callModel(data)
       
      });
  };

// call the IA model 
    
    const callModel = async (data) => {
     
      const res = await axios.post("http://localhost:8000/models/QuantityTraitement", data);
    };




  // date loading
  const [dateLoading, setDateLoading] = useState(true);

  return (
    <>
      
      
   
    <Button variant="text" sx={{  height : "50px" , color : "#113f67"}} startIcon={<PlayArrowIcon/>} onClick={GetDates}>
      <h4>Lancer le Traitement </h4>
    </Button>
     

     
     </> 
   
  );
};

export default FormTreatementNew;
