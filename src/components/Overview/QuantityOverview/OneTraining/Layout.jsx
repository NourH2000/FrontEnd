import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Cards from "./Cards";
import { useLocation } from "react-router-dom";
import OneTrainingdataGrid from "./Datagrid";
import DonutChart from "./DonutChart";
import OneTrainingAssureDatagrid from "./AssureDatagrid";
import OneMedicationArea from "./Area";
import OneTrainingColumn from "./Column";
import OneTrainingBarHorizontal from "./BarHorizontal";
import OneTrainingLine from "./Line";
import axios from "axios";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import DataGridTraining from "./Datagrid";

const OverviewOneTrainingLayoutQ = () => {
  // recupérer l'id de historique
  //const location = useLocation();
  //const idHistory = location.state.idHistory;
  //const medicament = location.state.medi;
 

  const [idMax, setIdMax] = useState();
  useEffect(() => {
   const interval = setInterval(() => {
   axios
     .get("http://localhost:8000/overviewQ/MaxTrainingQ")
     .then((response) => {
      
       setIdMax((prev) => {
         if (JSON.stringify(prev) !== JSON.stringify(response)) {
          console.log("am right here ");
           return response.data[0].maxid;
         }
         return prev;
       });
     });
    
   }, 1000);
   return () => clearInterval(interval);
 }, []);




  
  const ItemStack = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),

    color: theme.palette.text.secondary,
  }));
  const CountMedicament = "Medicament";
  const CasPerMedicament = "Cas";
  const Assuré = "Assuré";

  const ItemGrid = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),

    color: theme.palette.text.secondary,
  }));


  return (
    <><Typography
    color="#113f67"
    sx={{  marginBottom: "2%", marginTop: "2%" }}
    variant="h6"
    gutterBottom
  >
   Traitement quantité <strong>{idMax}</strong>
  </Typography>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <ItemStack elevation={0} sx={{ backgroundColor: "transparent" }}>
          <Grid
            container
            md={12}
            sm={12}
            xs={12}
            justifyContent="space-between"
          >
            <Grid item xs={12} md={7.5} sm={12} padding={0}>
              <Stack spacing={4}>
                <ItemStack
                  sx={{
                    boxShadow: "none",
                    textAlign: "center",
                    backgroundColor: "transparent",
                    padding: "0px",
                  }}
                >
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    md={12}
                    sm={12}
                    xs={12}
                  >
                    <Grid item md={5.9} sm={12} xs={12}>
                      <Cards type={CountMedicament} idMax={idMax} />
                    </Grid>
                    <Grid item md={5.9} sm={12} xs={12}>
                      <Cards type={CasPerMedicament} idMax={idMax} />
                    </Grid>
                  </Grid>
                </ItemStack>
                <ItemStack
                  sx={{
                    boxShadow: "none",
                    padding: "0px",
                    backgroundColor: "transparent",
                  }}
                >
                  {" "}
                  <Grid container spacing={2}>
                    <Grid
                      item
                      spacing={0}
                      xs={12}
                      sx={{ backgroundColor: "transparent" }}
                    >
                      <ItemGrid xs={9} sx={{ padding: "3%" }}>
                        <OneTrainingdataGrid idMax={idMax}/>{" "}
                      </ItemGrid>
                    </Grid>
                  </Grid>
                </ItemStack>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4} sm={12}>
              <ItemGrid sx={{ padding: "3%" }}>
                <DonutChart idMax={idMax} />
              </ItemGrid>
              <ItemGrid sx={{ padding: "3%", marginTop: "10px" }}>
                <OneTrainingBarHorizontal idMax={idMax} />
              </ItemGrid>
            </Grid>
          </Grid>
        </ItemStack>
        <ItemStack elevation={0} sx={{ backgroundColor: "transparent" }}>
          <Grid
            container
            md={12}
            sm={12}
            xs={12}
            justifyContent="space-between"
          >
            <Grid item xs={6} sx={{ backgroundColor: "transparent" }}>
              <ItemGrid sx={{ padding: "3%" }}>
                <OneTrainingAssureDatagrid idMax={idMax} />
              </ItemGrid>
            </Grid>
            <Grid item xs={5} sx={{ backgroundColor: "transparent" , height : "100%" }}>
              <ItemGrid sx={{ padding: "3%" }}>
                <OneTrainingColumn idMax={idMax} />
              </ItemGrid>
            </Grid>
          </Grid>
        </ItemStack>
        <ItemStack elevation={0} sx={{ backgroundColor: "transparent" }}>
          <Grid
            container
            md={12}
            sm={12}
            xs={12}
            justifyContent="space-between"
          >
            <Grid item xs={12} sx={{ backgroundColor: "transparent" }}>
              <ItemGrid sx={{ padding: "3%" }}>
                {/*<OneMedicationArea />*/}
                <OneTrainingLine idMax={idMax} />
              </ItemGrid>
            </Grid>
          </Grid>
        </ItemStack>
      </Stack>
    </>
  );
};

export default OverviewOneTrainingLayoutQ;
