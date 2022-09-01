import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { makeStyles } from "@mui/styles";
import { styled, createStyles } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import axios from "axios";

import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  Chip,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { textAlign } from "@mui/system";

const OneMedicationStackedColumns = () => {
  // style the item stack
  const ItemStack = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),

    color: theme.palette.text.secondary,
  }));

  // get the data ( count grouped by medication )

  const location = useLocation();

  // Id of training :
  const idHistory = location.state.idHistory;

  // initial values
  const [tier_payant, setTier_payant] = useState([]);
  const [countTP, setCountTTP] = useState([]);

    // initial values
    const [ts, setTs] = useState([]);
    const [countTS, setCountTS] = useState([]);
  
    

    // function to group the data by tier_payant and count em :
    const groupTP = function (array) {
      var r = [],
        o = {};
      array.forEach(function (a) {
        if (!o[a.tier_payant]) {
          o[a.tier_payant] = { key: a.tier_payant, value: 0 };
          r.push(o[a.tier_payant]);
        }
        o[a.tier_payant].value++;
      });
      return r;
    };
  

     // function to group the data by ts and count em :
     const groupTS = function (array) {
      var r = [],
        o = {};
      array.forEach(function (a) {
        if (!o[a.ts]) {
          o[a.ts] = { key: a.ts, value: 0 };
          r.push(o[a.ts]);
        }
        o[a.ts].value++;
      });
      return r;
    };

  
  useEffect(() => {
    // get the tier_payant suspected with count
    const resultTier_payant = [];
    const resultcount = [];
    axios
      .get(
        "http://localhost:8000/DetailsOfTrainingP/CountTP",
        {
          params: {
            idEntrainement: idHistory,
          },
        }
      )
      .then((response) => {
        // get the data
        const data = response.data;
       
         // group the data :
         const groupedData = groupTP(data);
         
        
         //push the result into the final data

        groupedData.map((data, key) => {
          

          switch(data.key) {
            case 'O':
              data.key = "Tier payant"
              break;
            case 'N':
              data.key = "Hors tier payant"
              break;
            default:
              data.key = "Undefined"
          } 

          resultTier_payant.push(data.key);
          resultcount.push(data.value);
        });

        
        // push the result into the series of chart
        setTier_payant(resultTier_payant);
        setCountTTP(resultcount);

        
       
      });
  }, []);


  useEffect(() => {
    // get the TS suspected with count
    const resultTs = [];
    const resultcount = [];
    axios
      .get(
        "http://localhost:8000/DetailsOfTrainingP/CountTS",
        {
          params: {
            idEntrainement: idHistory,
          },
        }
      )
      .then((response) => {
        // get the data
        const data = response.data;
         // group the data :
         const groupedData = groupTS(data);

         //push the result into the final data

        groupedData.map((data, key) => {
          switch(data.key) {
            case 'O':
              data.key = "traitement specifique"
              break;
            case 'N':
              data.key = " Hors traitement specifique"
              break;
            default:
              data.key = "Undefined"
          } 
          resultTs.push(data.key);
          resultcount.push(data.value);
        });

        // push the result into the series of chart
        setTs(resultTs);
        setCountTS(resultcount);

        
       
      });
  }, []);


  const a  = {
    colors: ["#38598b", "#ffc55c", "#e95d35", "#f8da5b"],
          
    series: [{
      // les oui : ts and tp
      name: "oui",
      data: [{
        x: '',
        y: countTP[0]
      }, {
        x: '',
        y: countTS[0]
      }],
    },
    {
      // les non : ts and tp
      name: "Non",
      data: [{
        x: '',
        y: countTP[1]
      }, {
        x: '',
        y: countTS[1]
      }],
    }],
    
    options: {
      colors: ["#113f67", "#ffc55c"],

      chart: {
        type: "bar",
        height: 350,
      },
      noData: {
        text: "Empty data",
      },
      xaxis: {
        type: 'category',
      
        group: {
          style: {
            fontSize: '10px',
            fontWeight: 700
          },
          groups: [
            { title: 'Traitement specifique', cols: 1 },
            { title: 'Tier_payant', cols: 1 }
          ]
        }
      },
      
      
    },
  
  
  };

 

  return (
    <Stack
      direction="column"
      alignItems="stretch"
      spacing={0}
      sx={{
        height: "492px",
        width: "100%",
      }}
    >
     <ItemStack elevation={0}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Typography
            color="black"
            sx={{ fontWeight: "bold", marginBottom: "2%", marginTop: "1%" }}
            variant="h6"
            gutterBottom
          >
            TP et TS
          </Typography>
          <Chip
            label="Details"
            sx={{ marginTop: "1%" }}
            variant="outlined"
            //onClick={}
          />
        </Stack>

        <Divider />
      </ItemStack>
      <ItemStack
        elevation={0}
        sx={{
          height: "100%",
          width: "100%",
          marginTop: "2%",
          textAlign: "center",
        }}
      >
      <Chart
          type="bar"
          width="100%"
          height="100%"
          options={a.options} 
          series={a.series}
 />
   
      </ItemStack>
    </Stack>
  );
};

export default OneMedicationStackedColumns;
