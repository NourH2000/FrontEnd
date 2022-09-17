import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, Paper, Stack, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

// 1/ columns
const columns = [
  {
    field: "id",
    headerName: "Id",
    width: 100,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "prescription",
    headerName: "Ordonnance",
    width: 250,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "nassuré",
    headerName: "N° d'assuré ",
    width: 200,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
  
  {
    field: "age",
    headerName: " Age",
    width: 100,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 200,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "affections",
    headerName: "Affection",
    width: 200,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "pharmacie",
    headerName: "Pharmacie",
    width: 240,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },

  {
    field: "QuantitéPrescrite",
    headerName: "Quantité prescrite",
    width: 170,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
];

const OneMedicationdataGrid = () => {
  // item stack
  const ItemStack = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(0),

    color: theme.palette.text.secondary,
  }));

  const location = useLocation();
  //data
  const [tableData, setTableData] = useState([]);
  // fetch the data :
  const idMax = location.state.idMax;
  const medicament = location.state.medicament;

  useEffect(() => {
    axios
      .get("http://localhost:8000/DetailsOfMedicationQ/OneMedication", {
        params: {
          idEntrainement: idMax,
          NumEnR: medicament,
        },
      })
      .then((response) => {
        setTableData(response.data);
      });
  }, []);

  // auto increment ID

  let i = 0;
  const inc = () => {
    i = i + 1;
    return i;
  };

  const HistoryRow = tableData.map((row) => {
    return {
      id: inc(i),
      prescription: row?.fk,
      nassuré: row?.no_assure,
      QuantitéPrescrite: row?.quantite_med,
      age: row?.age,
      affections: row?.affection,
      pharmacie: row?.codeps,
      gender: 
        (row?.gender == 0 && "Femelle") ||
        (row?.gender == 1 && "Mâle") 
    };
  });

  const [pageSize, setPageSize] = useState(30);

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
          sx={{ fontWeight: "bold" }}
          variant="h6"
          gutterBottom
        >
          Médicament  : {medicament}
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
              sortModel: [{ field: "quantityRejected", sort: "desc" }],
            },
          }}
        />
      </ItemStack>
    </Stack>
  );
};

export default OneMedicationdataGrid;
