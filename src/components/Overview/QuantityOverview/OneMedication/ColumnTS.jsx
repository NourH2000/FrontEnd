import { Stack, Typography, Paper, Divider, Chip } from "@mui/material";
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { gridColumnsSelector } from "@mui/x-data-grid";

const OneMedicationColumnTS = () => {
  // item stack
  const ItemStack = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(0),

    color: theme.palette.text.secondary,
  }));

  // get the data ( count grouped by medication )

  const location = useLocation();

  // Id of training :
  const idMax = location.state.idMax;
  const medicament = location.state.medicament;

  // initial values
  const [ts, setts] = useState([]);
  const [count, setCount] = useState([]);

  // function to group the data by ts and count em :
  const group = function (array) {
    var r = [],
      o = {};
    array.forEach(function (a) {
      if(a.ts == -1 || a.ts == 1 ){
        a.ts = 'Hors traitement spécifique'  }
        else{
          a.ts = 'Traitement spécifique'
      }
      if (!o[a.ts]) {
        o[a.ts] = { key: a.ts, value: 0 };
        r.push(o[a.ts]);
      }
      o[a.ts].value++;
    });
    return r;
  };

  useEffect(() => {
    // get the medication suspected with count
    const resultts = [];
    const resultcount = [];
    axios
      .get(
        "http://localhost:8000/DetailsOfMedicationQ/TsOneMedication/",
        {
          params: {
            idEntrainement: idMax,
            numEnr: medicament,
          },
        }
      )
      .then((response) => {
        // get the data result
        const data = response.data;

        // group the data :
        const groupedData = group(data);
        //const groupedData = [{key : "Traitement spécifique" , value : 32 } , {key : "Hors traitement spécifique" , value : 15 }]
        //console.log(groupedData)
        // push the data into a table of ts and count
        groupedData.map((data, key) => {
          resultts.push(data.key);
          resultcount.push(data.value);
        });

        // push the result into the series of chart
        setts(resultts);
        setCount(resultcount);
      });
  }, []);

  const option = {
    series: [
      {
        data: count,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,

        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#38598b"],
        },
      },

      xaxis: {
        categories: ts,
        position: "top",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {},
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
        },
      },
    },
  };
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

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
            TS
          </Typography>
          <Chip
            label="Details"
            sx={{ marginTop: "1%" }}
            variant="outlined"
            onClick={handleClick}
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
          options={option.options}
          series={option.series}
        />
      </ItemStack>
    </Stack>
  );
};

export default OneMedicationColumnTS;
