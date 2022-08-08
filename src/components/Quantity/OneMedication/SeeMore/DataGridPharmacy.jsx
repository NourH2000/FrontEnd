import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { color } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, Paper, Stack, Divider } from "@mui/material";
import { styled, createStyles } from "@mui/material/styles";
import Layout from "./Layout";
/////////////////////////// data grid de 1 entrainement ////////////////////:
// 1/ columns
const columns = [
  {
    field: "id",
    headerName: "Id",
    width: 110,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "codeps",
    headerName: "Pharmacy",
    width: 218,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "count",
    headerName: "Count",
    width: 150,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
];

const OneTrainingPharmacyDatagridSeeMore = () => {
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
            idEntrainement: idHistory,
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

        // if the data < 5 ==> get all the data
        for (let i = 0; i < SortedData.length; i++) {
          resultcodeps.push({
            codeps: SortedData[i].key,
            count: SortedData[i].value,
          });
        }

        // push the result into the series of chart
        setCodeps(resultcodeps);
      });
  }, []);
  // auto increment ID
  let i = 0;
  const inc = () => {
    i = i + 1;
    return i;
  };
  const HistoryRow = codeps.map((row) => {
    return {
      id: inc(i),
      codeps: row?.codeps,
      count: row?.count,
    };
  });

  // go to the details of one medication
  //Navigation
  const navigate = useNavigate();
  const [DetailsTable, setDetailsTable] = useState(false);
  const openDetails = (row) => {
    setDetailsTable(true);
    console.log(DetailsTable);
    <Layout />;
  };

  const [pageSize, setPageSize] = useState(20);
  return (
    <Stack
      direction="column"
      alignItems="stretch"
      spacing={0}
      sx={{ height: 700, width: "100%" }}
    >
      <ItemStack elevation={0}>
        <Typography
          color="black"
          sx={{ fontWeight: "bold", marginBottom: "2%", marginTop: "2%" }}
          variant="h6"
          gutterBottom
        >
          All suspected pharmacy for training : {idHistory}
        </Typography>
        <Divider />
      </ItemStack>
      <ItemStack
        elevation={0}
        sx={{
          height: "100%",
          width: "100%",
          marginTop: "2%",
          textAlign: "center",

          "& .super-app-theme--header": {
            backgroundColor: " #e7eaf6",

            color: "black",
          },
        }}
      >
        <DataGrid
          sx={{ border: "none" }}
          rows={HistoryRow}
          columns={columns}
          pagination={true}
          pageSize={pageSize}
          components={{ Toolbar: GridToolbar }}
          loading={!HistoryRow.length}
          initialState={{
            sorting: {
              sortModel: [{ field: "Nombre_suspécieux", sort: "desc" }],
            },
          }}
          onRowClick={(e) => openDetails(e.row)}
        />
      </ItemStack>
    </Stack>
  );
};

export default OneTrainingPharmacyDatagridSeeMore;
