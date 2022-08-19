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

const polarArea = () => {
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
  const [ts, setTs] = useState([]);
  const [count, setCount] = useState([]);
  
    // function to group the data by ts and count em :
    const group = function (array) {
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
         const groupedData = group(data);

         //push the result into the final data

        groupedData.map((data, key) => {
          resultTs.push(data.key);
          resultcount.push(data.value);
        });

        // push the result into the series of chart
        setTs(resultTs);
        setCount(resultcount);

     
       
      });
  }, []);

  return (
    <Stack
      direction="column"
      alignItems="stretch"
      spacing={0}
      sx={{
        height: "468px",
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
            the {medicationNumber} medication most suspicious
          </Typography>

          <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 20, marginBottom: "%" }}
          >
            <Select
              defaultValue={5}
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={medicationNumber}
              onChange={handleChange}
              label="Number"
              autoWidth
              sx={{ fontWeight: "bold" }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </FormControl>
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
          options={{
            labels: medication,
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
          type="donut"
          height="100%"
          width="100%"
        />
      </ItemStack>
    </Stack>
  );
};

export default polarArea;
