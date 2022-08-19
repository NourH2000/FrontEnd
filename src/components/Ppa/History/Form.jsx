import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import moment from "moment";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Button,
  Grid,
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
import { styled, createStyles } from "@mui/material/styles";
import RotateLoader from "react-spinners/RotateLoader";
const Form = () => {
  // item stack
  const ItemStack = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(0),

    color: theme.palette.text.secondary,
  }));
  //initial values
  //const today = new Date();
  //const [valueOne, setValueOne] = useState(moment(today).format("YYYY-MM-DD"));
  //const [valueTwo, setValueTwo] = useState(moment(today).format("YYYY-MM-DD"));
  const [valueOne, setValueOne] = useState(null);
  const [valueTwo, setValueTwo] = useState(null);

  // values choosed
  const handleChangevalueOne = (newValueOne) => {
    newValueOne = moment(newValueOne).format("YYYY-MM-DD");
    setValueOne(newValueOne);
  };

  const handleChangevalueTwo = (newValueTwo) => {
    newValueTwo = moment(newValueTwo).format("YYYY-MM-DD");
    setValueTwo(newValueTwo);
  };

  // get data and call the model :
  const data = { date_debut: valueOne, date_fin: valueTwo };
  const callModel = async (data) => {
    const res = await axios.post("http://localhost:8000/models/ppamodel", data);
  };

  // test is this training exist or not ( if it exists => error (snackBar) , else => call the model )

  // snackBar
  const [open, setOpen] = useState(false);
  const [alertOption, setAlertOption] = useState({});

  const test = async () => {
    await axios
      .get("http://localhost:8000/models/TestTraining", {
        params: {
          date_debut: data.date_debut,
          date_fin: data.date_fin,
          type: 2,
        },
      })
      .then((response) => {
        response.data[0].count > 0 ? setOpen(true) : callModel(data);
      });
  };

  // find the max and min date allowed
  const [maxDate, setMaxDate] = useState(null);
  const [minDate, setMinDate] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/models/getMindateP").then((response) => {
      
      setMinDate(response.data.date_paiment_min);
      setValueOne(response.data.date_paiment_min);
    });
  }, []);
 
  useEffect(() => {
    axios.get("http://localhost:8000/models/getMaxdateP").then((response) => {
      
      setMaxDate(response.data.date_paiment_max);
      setValueTwo(response.data.date_paiment_max);
    });
  }, []);

  // Clear all
  const ClearAll = () => {
    setValueOne(minDate);
    setValueTwo(maxDate);
  };
  // date loading
  const [dateLoading, setDateLoading] = useState(true);

  console.log(minDate)
  console.log(maxDate)

  return (
    <>
      {minDate && maxDate?
      <Stack
      direction="column"
      alignItems="stretch"
      spacing={0}
      sx={{ height: "100%", width: "100%" }}
    >
      
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={(event, reason) => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={(event, reason) => setOpen(false)} severity="error">
          <strong>This interval of date has already trained </strong>
        </Alert>
      </Snackbar> 
       <ItemStack elevation={0} sx={{ textAlign: "left" }}>
       <Typography
         color="black"
         sx={{ fontWeight: "bold", marginBottom: "5%", marginTop: "5%" }}
         variant="h6"
         gutterBottom
       >
         New training
       </Typography>
       <Divider />
     </ItemStack>
     <ItemStack
     elevation={0}
     sx={{
       height: "100%",
       width: "100%",
       textAlign: "center",
       marginTop: "10%",
     }}
   >
     <LocalizationProvider dateAdapter={AdapterDateFns}>
       <Stack spacing={2}>
       {/*<DatePicker
        label="Basic example"
        value={valueOne}
        minDate={minDate}
           maxDate={maxDate}
        onChange={handleChangevalueOne}
        renderInput={(params) => <TextField
          {...params}
          inputProps={{
            ...params.inputProps,
            placeholder: "dd/mm/aaaa",
          }}
        />}
      />*/}
         <DesktopDatePicker
           label="De"
           inputFormat="dd/MM/yyyy"
           value={valueOne}
           minDate={minDate}
           maxDate={maxDate}
           onChange={handleChangevalueOne}
           renderInput={(params) => (
             <TextField
               {...params}
               inputProps={{
                 ...params.inputProps,
                 placeholder: "dd/mm/aaaa",
               }}
             />
           )}
         />

         <DesktopDatePicker
           label="Jusqu'a"
           inputFormat="dd/MM/yyyy"
           value={valueTwo}
           minDate={minDate}
           maxDate={maxDate}
           onChange={handleChangevalueTwo}
           renderInput={(params) => (
             <TextField
               {...params}
               inputProps={{
                 ...params.inputProps,
                 placeholder: "dd/mm/aaaa",
               }}
             />
           )}
         />
       </Stack>
     </LocalizationProvider>
   </ItemStack>
   <ItemStack
     elevation={0}
     sx={{
       height: "100%",
       width: "100%",
       textAlign: "center",
     }}
   >
     <Stack direction="row" justifyContent="space-between">
       <Button variant="text" endIcon={<SendIcon />} onClick={test}>
         Send
       </Button>
       <IconButton aria-label="delete" size="large" onClick={ClearAll}>
         <ClearAllIcon fontSize="inherit" />
       </IconButton>
     </Stack>
   </ItemStack> </Stack>
      :
      <Stack
      direction="column"
      
      spacing={0}
      sx={{ height: "300px", width: "100%" }}
    > <ItemStack elevation={0} sx={{ textAlign: "left" }}>
    <Typography
      color="black"
      sx={{ fontWeight: "bold", marginBottom: "5%", marginTop: "5%" }}
      variant="h6"
      gutterBottom
    >
      New training
    </Typography>
    <Divider />
  </ItemStack><ItemStack
     elevation={0}
     sx={{
       height: "100%",
       width: "100%",
       
     }}
   >
     <Stack direction="row" justifyContent="center"
  alignItems="center" 
  sx={{ height: "100%",}}>
     <RotateLoader color="#113f67" loading={dateLoading} sx={{ display: "block",   margin: "auto auto", borderColor: "red"}} size={10}  />

     </Stack>
   </ItemStack> </Stack> }
      
     
     </> 
   
  );
};

export default Form;
