import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useLocation } from "react-router-dom";
import OneTrainingAssureDatagridSeeMore from "./DataGridAssure";
import OneTrainingPharmacyDatagridSeeMore from "./DataGridPharmacy";
import OneTrainingCenterDatagridSeeMore from "./DataGridCenter";

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

const OneMedicationLayoutQSeeMore = ({ DetailsTable }) => {
  // recupérer l'id de historique
  const location = useLocation();
  const idHistory = location.state.idHistory;

  const ItemStack = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),

    color: theme.palette.text.secondary,
    boxShadow: "none",
  }));

  const ItemGrid = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),

    color: theme.palette.text.secondary,
  }));

  return (
    <Stack spacing={1} sx={{ width: "100%" }}>
      <ItemStack sx={{ backgroundColor: "transparent" }}>
        <Grid container spacing={2}>
          <Grid item spacing={0} xs={12}>
            <ItemGrid xs={9} sx={{ padding: "3%", height: 800 }}>
              {" "}
              <OneTrainingAssureDatagridSeeMore />{" "}
            </ItemGrid>
          </Grid>
        </Grid>
      </ItemStack>

      <ItemStack sx={{ backgroundColor: "transparent" }}>
        <Grid container spacing={2}>
          <Grid item spacing={0} xs={4}>
            <ItemGrid xs={9} sx={{ padding: "3%", height: 800 }}>
              {" "}
              <OneTrainingPharmacyDatagridSeeMore />{" "}
            </ItemGrid>
          </Grid>
          <Grid item spacing={0} xs={8}>
            <ItemGrid xs={9} sx={{ padding: "3%", height: 800 }}>
              {" "}
              <OneTrainingCenterDatagridSeeMore />{" "}
            </ItemGrid>
          </Grid>
        </Grid>
      </ItemStack>
    </Stack>
  );
};

export default OneMedicationLayoutQSeeMore;
