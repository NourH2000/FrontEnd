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

const OneTrainingDonutChartPhar = () => {
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
  const [codeps, setcodeps] = useState([]);
  const [count, setCount] = useState([]);

  
    // function to group the data by codeps and count em :
    const group = function (array) {
      
      var o = {Agent_cnas : 0 , Pharmacy : 0};
      array.forEach(function (a) {
        if (a.codeps == "None") {
          o.Agent_cnas++
          
        }else{
          o.Pharmacy++
        }
        
      });
      return o;
    };
  

  
  useEffect(() => {
    // get the codeps suspected with count
    const resultcodeps = [];
    const resultcount = [];
    axios
      .get(
        "http://localhost:8000/DetailsOfTrainingP/CountPhar",
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
         const groupedData = group(data);
         
         //push the result into the final data
   
        // push the result into the series of chart
        setcodeps(["Agent cnas" , "Pharmacy"]);
        setCount([groupedData.Agent_cnas , groupedData.Pharmacy]);

        
       
      });
  }, []);

  

  return (
    <Stack
    direction="column"
    alignItems="stretch"
    spacing={0}
    sx={{
      height: "400px",
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
          sx={{ fontWeight: "bold", marginBottom: "0%", marginTop: "1%" }}
          variant="h6"
          gutterBottom
        >
        Pharmacies
        </Typography>

        
      </Stack>

      <Divider />
    </ItemStack>
    <ItemStack
      elevation={0}
      sx={{
        height: "100%",
        width: "100%",
        marginTop: "0%",
        margin : "0%",
        textAlign: "center",
        
      }}
    >
      <Chart
      
        options={{
          labels: codeps,
          colors: ["#38598b", "#ffc55c", "#e95d35", "#f8da5b"],
          dataLabels: {
            enabled: false,
          },
          noData: {
            text: "Empty data",
          },
          plotOptions: {
            pie: {
              expandOnclick: false,
              donut: {
                size: "55px",
                labels: {
                  show: true,
                  total: {
                    show: false,
                  },
                },
              },
            },
          },

          legend: {
            position: "top",
            height: 100,
            fontSize: 15,
            onItemClick: {
              toggleDataSeries: true,
            },
            onItemHover: {
              highlightDataSeries: true,
            },
          },
          tooltip: {
            enabled: true,
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                  
                },
              },
            },
          ],
        }}
        series={count}
        type="pie"
        height="100%"
        width="100%"
      />
    </ItemStack>
  </Stack>
  );
};

export default OneTrainingDonutChartPhar;
