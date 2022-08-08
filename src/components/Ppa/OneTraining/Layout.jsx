import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Cards from "./Cards";
import { useLocation } from "react-router-dom";
import OneTrainingdataGrid from "./Datagrid";
import DonutChart from "./DonutChart";
import OneTrainingColumn from "./Column";
import OneTrainingBarHorizontal from "./BarHorizontal";
import { Grid, Paper, Stack } from "@mui/material";
import OneTrainingLine from "./Line";

const OneTrainingLayoutP = () => {
  // recupérer l'id de historique
  const location = useLocation();
  const idHistory = location.state.idHistory;
  const medicament = location.state.medi;
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
    <>
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
                      <Cards type={CountMedicament} />
                    </Grid>
                    <Grid item md={5.9} sm={12} xs={12}>
                      <Cards type={CasPerMedicament} />
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
                        <OneTrainingdataGrid />{" "}
                      </ItemGrid>
                    </Grid>
                  </Grid>
                </ItemStack>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4} sm={12}>
              <ItemGrid sx={{ padding: "3%" }}>
                <DonutChart />
              </ItemGrid>
              <ItemGrid sx={{ padding: "3%", marginTop: "10px" }}>
                <OneTrainingBarHorizontal />
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
                <OneTrainingColumn />
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
                <OneTrainingLine />
              </ItemGrid>
            </Grid>
          </Grid>
        </ItemStack>
      </Stack>
    </>
  );
};

export default OneTrainingLayoutP;
