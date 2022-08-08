import { Stack, Typography, Paper, Divider, Chip } from "@mui/material";
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import axios from "axios";

const OneMedicationArea = () => {
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
  const idHistory = location.state.idHistory;
  const medicament = location.state.medicament;

  // initial values
  const [medication, setMedication] = useState([]);
  const [count, setCount] = useState([]);

  useEffect(() => {
    // get the medication suspected with count
    const medicationName = [];
    const medicationCount = [];
    axios
      .get("http://localhost:8000/DetailsOfMedicationQ/CountCenterSuspected", {
        params: {
          idEntrainement: idHistory,
          centre: "ouest",
          numEnr: medicament,
        },
      })
      .then((response) => {
        // get the data rsesult
        const data = response.data;

        // create the num_enr array and the count array
        for (let i = 0; i < data.length; i++) {
          medicationName.push(parseInt(data[i].num_enr)),
            medicationCount.push(parseInt(data[i].count));
        }

        // set the series and labels state
        setMedication(medicationName);
        setCount(medicationCount);
      });
  }, []);

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
            The Result By center
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
          type="area"
          width="100%"
          height="100%"
          series={[
            { name: "Est", data: count },
            { name: "Ouest", data: count },
            { name: "Sud", data: count },
            { name: "Nord", data: count },
          ]}
          options={{
            colors: ["#38598b", "#ffc55c", "#e95d35", "#f8da5b"],
            stroke: { width: 3, curve: "smooth" },
            ///fill:{opacity:1, type:'solid'},

            yaxis: {
              title: {
                style: { fontSize: 20 },
              },
            },
          }}
        ></Chart>
      </ItemStack>
    </Stack>
  );
};

export default OneMedicationArea;
