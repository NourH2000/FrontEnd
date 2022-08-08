import { Stack, Typography, Paper, Divider, Chip, Table } from "@mui/material";
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
const OneTrainingArea = () => {
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
  const [Result, setResult] = useState([]);

  // function to group the data by num_enr and count em :
  const group = function (array) {
    var r = [],
      o = {};
    array.forEach(function (a) {
      if (!o[a.num_enr]) {
        o[a.num_enr] = { key: a.num_enr, value: 0 };
        r.push(o[a.num_enr]);
      }
      o[a.num_enr].value++;
    });
    return r;
  };

  useEffect(() => {
    // get the medication suspected with count
    const resultArray = [];

    axios
      .get("http://localhost:8000/DetailsOfTrainingQ/CountCenterMedication/", {
        params: {
          idEntrainement: idHistory,
        },
      })
      .then((response) => {
        // get the data result
        const data = response.data;
        /**  the goal from this part is to make data on the shape =>  **/
        /**  [ {center03 , array of values} , {center03 , array of values} , {center03 , array of values} ]**/

        // group the data :

        var groupedData = _.mapValues(_.groupBy(data, "centre"), (clist) =>
          clist.map((data) => _.omit(data, "centre"))
        );

        // group the medication of each centre and count em
        Object.entries(groupedData).map(([key, value]) => {
          const groupedDataBy = group(value);

          // now push the data into the result array as a object
          resultArray.push({ name: key, data: groupedDataBy });
        });

        var countTable = [];
        const final = [];

        // foreach item ( data object (count) with name of center)
        resultArray.map((table) => {
          // foreach item ( for each value (count))
          table.data.map((count) => {
            // push the value into a table to save all the counts in a table  without num_enr
            countTable.push(count.value);
          });

          // push the data as an object of ( center , array of values ( count))
          final.push({ name: table.name, data: countTable });
          // empty the table of count
          countTable = [];
        });
        // set the dataState
        setResult(final);
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
          series={Result}
          options={{
            colors: ["#38598b", "#ffc55c", "#e95d35", "#f8da5b"],
            stroke: { width: 3, curve: "smooth" },
            ///fill:{opacity:1, type:'solid'},

            yaxis: {
              title: {
                style: { fontSize: 20 },
              },
            },
            dataLabels: {
              enabled: false,
            },
          }}
        ></Chart>
      </ItemStack>
    </Stack>
  );
};

export default OneTrainingArea;
