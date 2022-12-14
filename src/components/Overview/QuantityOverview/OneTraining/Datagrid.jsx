import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { color } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, Paper, Stack, Divider } from "@mui/material";
import { styled, createStyles } from "@mui/material/styles";

/////////////////////////// data grid de 1 entrainement ////////////////////:
// 1/ columns
const columns = [
  {
    field: "id",
    headerName: "Id",
    width: 147,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "Médicament",
    headerName: "Médication",
    width: 270,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "Nombre_total",
    headerName: "totale",
    width: 270,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "Nombre_suspécieux",
    headerName: "Cas suspect",
    width: 270,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
];
const OneTrainingDatagrid = ({idMax}) => {
  const ItemStack = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(0),

    color: theme.palette.text.secondary,
  }));

  //data
  const [tableData, setTableData] = useState([]);



  useEffect(() => {
    if(idMax){
    axios
      .get("http://localhost:8000/DetailsOfTrainingQ/ByMedication", {
        params: {
          idEntrainement: idMax,
        },
      })
      .then((response) => {
        setTableData(response.data);
      });
    }
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
      Médicament: row?.num_enr,
      Nombre_total: row?.count_medicament,
      Nombre_suspécieux: row?.count_medicament_suspected,
    };
  });

  // go to the details of one medication
  //Navigation
  const navigate = useNavigate();
  const navigateToOneMedication = (row) => {
    navigate("/overview/quantity/oneMedication", {
      state: { idMax: idMax, medicament: row.Médicament },
    });
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
          Resultas par medicament 
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
          onRowClick={(e) => navigateToOneMedication(e.row)}
        />
      </ItemStack>
    </Stack>
  );
};

export default OneTrainingDatagrid;
