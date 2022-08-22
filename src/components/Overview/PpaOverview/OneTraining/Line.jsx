import { Stack, Typography, Paper, Divider, Chip } from "@mui/material";
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { gridColumnsSelector } from "@mui/x-data-grid";

const OneTrainingLine = ({idMax}) => {
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
  //const idMax = idMax
  // initial values
  const [center, setCenter] = useState([]);
  const [count, setCount] = useState([]);
  const [newRigion, setnewRigion] = useState({}); // this for the newRigion that not exist
  // function to group the data by center and count em :
  const group = function (array) {
    var r = [],
      o = {};
    array.forEach(function (a) {
      if (!o[a.region]) {
        o[a.region] = { key: a.region, value: 0 };
        r.push(o[a.region]);
      }
      o[a.region].value++;
    });
    return r;
  };

  useEffect(() => {
    // get the medication suspected with count
    const resultcenter = [];
    const resultcount = [];
    if(idMax){
    axios
      .get("http://localhost:8000/DetailsOfTrainingP/CountCenterMedication/", {
        params: {
          idEntrainement: idMax,
        },
      })
      .then((response) => {
        // get the data result
        const data = response.data;

        // group the data :
        const groupedData = group(data);

        //push the data into a table of center and count
        var v = {};
        // is all region exists
        for (let i = 1; i < 60; i++) {
          let find = false;
          groupedData.map((data, key) => {
            data.key == i ? (find = true) : false;
          });

          // if the wilata does not exist , add the new object
          if (!find) {
            v = { key: i, value: 0 };
            groupedData.push(v);
          }
        }
        // sort the result by region :
        const SortedData = groupedData.sort((a, b) => {
          return a.key - b.key;
        });
        //push the result into the final data

        groupedData.map((data, key) => {
          resultcenter.push(data.key);
          resultcount.push(data.value);
        });

        // push the result into the series of chart
        setCenter(resultcenter);
        setCount(resultcount);
      });
    }else{
    }
  }, [idMax]);

  const option = {
    stroke: { width: 7, curve: "smooth" },
    series: [
      {
        name: "rate",
        data: count,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },

      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: center,
      },
    },
  };
  //Navigation
  const navigate = useNavigate();
  const navigateToOneTrainingSeeMore = (row) => {
    navigate("/overview/ppa/oneTraining/SeeMore", {
      state: { idMax: idMax },
    });
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
            The fraud rate in each region
          </Typography>
          <Chip
            label=" See more"
            sx={{ marginTop: "1%" }}
            variant="outlined"
            onClick={navigateToOneTrainingSeeMore}
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
          type="area"
          width="100%"
          height="100%"
          options={option.options}
          series={option.series}
        />
      </ItemStack>
    </Stack>
  );
};

export default OneTrainingLine;
