import { Stack, Typography, Paper, Divider, Chip } from "@mui/material";
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { gridColumnsSelector } from "@mui/x-data-grid";

const OneTrainingColumn = () => {
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
  const idHistory = location.state.idHistory;

  // initial values
  const [center, setCenter] = useState([]);
  const [count, setCount] = useState([]);

  // function to group the data by center and count em :
  const group = function (array) {
    var r = [],
      o = {};
    array.forEach(function (a) {
      if (!o[a.centre]) {
        o[a.centre] = { key: a.centre, value: 0 };
        r.push(o[a.centre]);
      }
      o[a.centre].value++;
    });
    return r;
  };

  useEffect(() => {
    // get the medication suspected with count
    const resultcenter = [];
    const resultcount = [];
    axios
      .get("http://localhost:8000/DetailsOfTrainingQ//CountCenterMedication/", {
        params: {
          idEntrainement: idHistory,
        },
      })
      .then((response) => {
        // get the data result
        const data = response.data;

        // group the data :
        const groupedData = group(data);

        // push the data into a table of center and count
        groupedData.map((data, key) => {
          resultcenter.push(data.key);
          resultcount.push(data.value);
        });

        // push the result into the series of chart
        setCenter(resultcenter);
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
        categories: center,
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
            The fraud rate in each center
          </Typography>
          <Chip
            label=" See more"
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

export default OneTrainingColumn;
