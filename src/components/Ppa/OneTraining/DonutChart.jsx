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

const DonutChart = () => {
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
  const [medication, setMedication] = useState([]);
  const [count, setCount] = useState([]);

  // the medication number :
  const [medicationNumber, setMedicationNumber] = useState(10);

  const handleChange = (event) => {
    setMedicationNumber(event.target.value);
  };
  useEffect(() => {
    // get the medication suspected with count
    const medicationName = [];
    const medicationCount = [];
    let other = 0;

    axios
      .get(
        "http://localhost:8000/DetailsOfTrainingP/CountMedicamentSuspected",
        {
          params: {
            idEntrainement: idHistory,
          },
        }
      )
      .then((response) => {
        // get the data
        const medication_rate = response.data;
        // sorting data
        const SortedData = medication_rate.sort((a, b) => {
          return b.count - a.count;
        });
        // si les resultas sont > medication number choosed : on prends the choosed number
        if (SortedData.length > medicationNumber) {
          // calculer Others
          for (let i = medicationNumber; i < SortedData.length; i++) {
            other = other + parseInt(SortedData[i].count);
          }

          // push this data into the array of the Donut
          for (let i = 0; i < medicationNumber; i++) {
            medicationName.push("Med: " + SortedData[i].num_enr),
              medicationCount.push(parseInt(SortedData[i].count));
          }
        } else {
          // si les resultas sont < medicationNumber choosed : on prends le length

          for (let i = 0; i < medication_rate.length; i++) {
            medicationName.push("Med: " + SortedData[i].num_enr),
              medicationCount.push(parseInt(SortedData[i].count));
          }
        }
        medicationName.push("Others");
        medicationCount.push(parseInt(other));

        // set the series and labels state
        setMedication(medicationName);
        setCount(medicationCount);
      });
  }, [medicationNumber]);

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

export default DonutChart;
