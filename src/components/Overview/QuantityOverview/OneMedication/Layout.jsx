import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

import { useLocation } from "react-router-dom";

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
import OneMedicationdataGrid from "./Datagrid";
import OneMedicationAssureDatagrid from "./AssureDatagrid";
import OneMedicationArea from "./Area";
import OneMedicationBarHorizontal from "./BarHorizontal";
import OneMedicationGenderCards from "./Cards";
import OneMedicationColumn from "./Column";
import OneMedicationDoubleColumn from "./DoubleColumn";
import OneMedicationLine from "./Line";
import OneMedicationColumnTS from "./ColumnTS"
const OverviewOneMedicationLayoutQ = () => {




  
  // recupérer l'id de historique
  const location = useLocation();
  const idMax = location.state.idMax;

  const ItemStack = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),

    color: theme.palette.text.secondary,
  }));

  const ItemGrid = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),

    color: theme.palette.text.secondary,
  }));

  return (
    <>
    <Typography
          color="#113f67"
          sx={{  marginBottom: "2%", marginTop: "2%" }}
          variant="h6"
          gutterBottom
        >
         Traitement quantité  <strong>{idMax}</strong>
        </Typography>
    <Stack spacing={1} sx={{ width: "100%" }}>
      <ItemStack elevation={0} sx={{ backgroundColor: "transparent" }}>
        <Grid
          container
          md={12}
          sm={12}
          xs={12}
          gap={0}
          padding={0}
          justifyContent="space-between"
        >
          

          <Grid item xs={4}>
            <ItemGrid xs={9} sx={{ padding: "3%" }}>
            <OneMedicationColumn />
            </ItemGrid>
          </Grid>
          <Grid item xs={3}>
            <Stack spacing={1} sx={{ width: "100%" }}>
              <ItemStack elevation={0} sx={{ backgroundColor: "transparent" }}>
                <OneMedicationGenderCards type={"T"} />
              </ItemStack>
              <ItemStack elevation={0} sx={{ backgroundColor: "transparent" }}>
                <OneMedicationGenderCards type={"F"} />
              </ItemStack>
              <ItemStack elevation={0} sx={{ backgroundColor: "transparent" }}>
                <OneMedicationGenderCards type={"M"} />
              </ItemStack>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <ItemGrid xs={9} sx={{ padding: "3%" }}>
              
              {<OneMedicationColumnTS />}
            </ItemGrid>
          </Grid>
        </Grid>
      </ItemStack>

      <ItemStack sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
        <Grid container spacing={2}>
          <Grid
            item
            spacing={0}
            xs={12}
            sx={{ backgroundColor: "transparent" }}
          >
            <ItemGrid xs={9} sx={{ padding: "3%" }}>
              <OneMedicationdataGrid xs={12} md={12} />
            </ItemGrid>
          </Grid>
        </Grid>
      </ItemStack>

      <ItemStack elevation={0} sx={{ backgroundColor: "transparent" }}>
        <Grid container xs={12} gap={0} justifyContent="space-between">
          <Grid item xs={4} sx={{ backgroundColor: "transparent" }}>
            <ItemGrid xs={9} sx={{ padding: "3%" }}>
              <OneMedicationAssureDatagrid />
            </ItemGrid>
          </Grid>
          <Grid item xs={7.5} sx={{ backgroundColor: "transparent" }}>
            <ItemGrid sx={{ padding: "3%" }}>
              

              <OneMedicationBarHorizontal />
            </ItemGrid>
          </Grid>
        </Grid>
      </ItemStack>
      <ItemStack sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
        <Grid container spacing={2}>
          <Grid
            item
            spacing={0}
            xs={12}
            sx={{ backgroundColor: "transparent" }}
          >
            <ItemGrid xs={9} sx={{ padding: "3%" }}>
              <OneMedicationLine />
            </ItemGrid>
          </Grid>
        </Grid>
      </ItemStack>
    </Stack></>
  );
};

export default OverviewOneMedicationLayoutQ;
