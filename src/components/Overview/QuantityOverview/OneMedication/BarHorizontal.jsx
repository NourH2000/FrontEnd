import { Stack, Typography, Paper, Divider, Chip } from "@mui/material";
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const OneMedicationBarHorizontal = () => {
  // item stack
  const ItemStack = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(0),

    color: theme.palette.text.secondary,
  }));

  // get the data ( count grouped by medication )

  const location = useLocation();

  // Id of training and num_enr :
  const idMax = location.state.idMax;
  const medicament = location.state.medicament;

  // initial values
  const [codeps, setCodeps] = useState([]);
  const [count, setCount] = useState([]);

  // function to group the data by codeps and count em :
  const group = function (array) {
    var r = [],
      o = {};
    array.forEach(function (a) {
      if (!o[a.codeps]) {
        o[a.codeps] = { key: a.codeps, value: 0 };
        r.push(o[a.codeps]);
      }
      o[a.codeps].value++;
    });
    return r;
  };

  useEffect(() => {
    // get the medication suspected with count
    const resultcodeps = [];
    const resultcount = [];

    axios
      .get(
        "http://localhost:8000/DetailsOfMedicationQ/CountCodepsOneMedication/",
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

        // sorting data by count
        const SortedData = groupedData.sort((a, b) => {
          return b.value - a.value;
        });

        // push the data into a table of codeps and count

        // push this data into the array of the BARS in the case of ::
        if (SortedData.length >= 10) {
          for (let i = 0; i < 10; i++) {
            resultcodeps.push(SortedData[i].key);
            resultcount.push(SortedData[i].value);
          }
        } else {
          // if the data < 5 ==> get all the data
          for (let i = 0; i < SortedData.length; i++) {
            resultcodeps.push(SortedData[i].key);
            resultcount.push(SortedData[i].value);
          }
        }

        // push the result into the series of chart
        setCodeps(resultcodeps);
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
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: codeps,
      },
    },
  };
  //Navigation
  const navigate = useNavigate();
  const navigateToOneMedicationSeeMore = (row) => {
    navigate("/overview/quantity/oneMedication/SeeMore", {
      state: { idMax: idMax, medicament: medicament },
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
            les 10 pharmacies les plus suspectes


          </Typography>
          <Chip
            label="Details"
            sx={{ marginTop: "1%" }}
            variant="outlined"
            onClick={navigateToOneMedicationSeeMore}
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

export default OneMedicationBarHorizontal;
