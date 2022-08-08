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
    field: "num_enr",
    headerName: "Insured Number",
    width: 270,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "fk",
    headerName: "Age",
    width: 270,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "date_paiement",
    headerName: "Gender",
    width: 270,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "quantite_med",
    headerName: "Affections",
    width: 270,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "quantite_predicted",
    headerName: "Wilaya",
    width: 270,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "qte_rejet_predicted",
    headerName: "Count",
    width: 270,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
];

const OneTrainingAssureDatagridOneInsured = () => {
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
  const idHistory = location.state.idHistory;

  useEffect(() => {
    axios
      .get("http://localhost:8000/DetailsOfTrainingQ/ByMedicationOneassure/", {
        params: {
          idEntrainement: idHistory,
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
      num_enr: row?.num_enr,
      fk: row?.fk,
      quantite_med: row?.quantite_med,
      quantite_predicted: row?.quantite_predicted,
      qte_rejet_predicted: row?.qte_rejet_predicted,
      date_paiement: row?.date_paiement,
    };
  });

  // go to the details of one medication
  //Navigation

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
          All suspected insured for training : {idHistory}
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
        />
      </ItemStack>
    </Stack>
  );
};

export default OneTrainingAssureDatagridOneInsured;
