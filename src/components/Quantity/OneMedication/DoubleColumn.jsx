import { Stack, Typography, Paper, Divider, Chip } from "@mui/material";
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import axios from "axios";
import _ from "lodash";

const OneMedicationDoubleColumn = () => {
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

  // function to group the data by age and count em :
  const group = function (array) {
    var r = [],
      o = {};
    array.forEach(function (a) {
      if (!o[a.gender]) {
        o[a.gender] = { key: a.gender, value: 0 };
        r.push(o[a.gender]);
      }
      o[a.gender].value++;
    });
    return r;
  };

  // initial values
  const [age, setAge] = useState([]);
  const [count, setCount] = useState([]);

  useEffect(() => {
    // get the age categories suspected with count
    const resultage = [];
    // get the gender by age suspected with count
    const resultArray = [];
    axios
      .get(
        "http://localhost:8000/DetailsOfMedicationQ/CountAgeGenderOneMedication/",
        {
          params: {
            idEntrainement: idHistory,
            numEnr: medicament,
          },
        }
      )
      .then((response) => {
        // get the data result
        const data = response.data;

        // group the data by age :

        var groupedData = _.mapValues(_.groupBy(data, "age"), (clist) =>
          clist.map((data) => _.omit(data, "age"))
        );

        // group the gender of each centre and count em
        Object.entries(groupedData).map(([key, gender]) => {
          const groupedDataBy = group(gender);
          // now push the data into the result array as a object
          resultArray.push({ age: key, genderTable: groupedDataBy });
        });

        var DataTable = [];
        const final = [];

        // foreach item ( data object (count) with name of center)
        resultArray.map((table) => {
          table.genderTable.map((value) => {
            // push the value into a table to save all the counts in a table  without num_enr
            DataTable.push(value.value);
          });
        });
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
            the 5 pharmacy most suspicious
          </Typography>
          <Chip label=" See more" sx={{ marginTop: "1%" }} variant="outlined" />
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
      ></ItemStack>
    </Stack>
  );
};

export default OneMedicationDoubleColumn;
