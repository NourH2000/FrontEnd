import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { color } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Paper,
  Stack,
  Divider,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { styled, createStyles } from "@mui/material/styles";
import OneTrainingAssureDatagridOneInsured from "./OneInsured";
import Layout from "./Layout";
/////////////////////////// data grid de 1 entrainement ////////////////////:
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
    field: "fk",
    headerName: "Ordonnance",
    width: 270,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "pharmacie",
    headerName: "Pharmacie",
    width: 120,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "prix_ppa",
    headerName: "Prix PPA",
    width: 110,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "prix_max",
    headerName: "Minimum prix",
    width: 110,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "prix_min",
    headerName: "Maximum prix",
    width: 110,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "type",
    headerName: "Type",
    width: 150,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
];

const OneMedicationCenterDatagridSeeMore = () => {
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
  const medicament = location.state.medicament;
  //console.log(medicament);
  //console.log(idHistory);

  // state for wilaya

  const AllWIlaya  =Array.from(Array(59).keys())
  //console.log(AllWIlaya);
  const All = 0
  const [wilaya, setWilaya] = useState(All);


  //const [wilaya, setwilaya] = useState(1);
  const handleChange = (event) => {
    setWilaya(event.target.value);
  };
  useEffect(() => {
    axios
      .get(
        "http://localhost:8000/DetailsOfMedicationP/CountOneCenterMedication/",
        {
          params: {
            idEntrainement: idHistory,
            region: wilaya,
            NumEnR: medicament,
          },
        }
      )
      .then((response) => {
        setTableData(response.data);
      });
  }, [wilaya]);

  // auto increment ID
  let i = 0;
  const inc = () => {
    i = i + 1;
    return i;
  };
  const HistoryRow = tableData.map((row) => {
    return {
      id: inc(i),
      fk: row?.fk,
      pharmacie: row?.codeps,
      prix_ppa: row?.prix_ppa,
      prix_max: row?.prix_max,
      prix_min: row?.prix_min,
      type:
        (row?.outside == "1" && "Supérieur au maximum") ||
        (row?.outside == "-1" && "Inférieur au minimum"),
    };
  });
  // table of wilaya's

  const Allwilaya = Array.from(Array(59).keys());
  // go to the details of one medication
  //Navigation
  const navigate = useNavigate();
  const [DetailsTable, setDetailsTable] = useState(false);
  const openDetails = (row) => {
    setDetailsTable(true);

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
           {wilaya == 0 ?"Les médicaments suspects dans toutes les régions"  :" Les médicaments suspects dans la région "+wilaya }
          </Typography>

          <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 20, marginBottom: "%" }}
          >
            <Select
              defaultValue={All}
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={wilaya}
              onChange={handleChange}
              label="Number"
              autoWidth
              sx={{ fontWeight: "bold" }}
            >
              
              <MenuItem value={0}>ALL</MenuItem>
                {AllWIlaya.map((row) => (
                <MenuItem value={row + 1}>{row + 1}</MenuItem>
              ))}
              
            </Select>
          </FormControl>
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

export default OneMedicationCenterDatagridSeeMore;
