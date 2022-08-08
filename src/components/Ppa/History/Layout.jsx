import React from "react";
import { styled } from "@mui/material/styles";
import Datagrid from "./Datagrid";
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
import Form from "./Form";

const HistoryLayoutP = () => {
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
          <Grid item spacing={0} xs={9}>
            <ItemGrid xs={9} sx={{ padding: "3%", height: 800 }}>
              <Datagrid xs={12} md={12} />
            </ItemGrid>
          </Grid>
          <Grid item xs={3}>
            <ItemGrid elevation={3}>
              <Form />
            </ItemGrid>
          </Grid>
        </Grid>
      </ItemStack>
    </Stack>
  );
};

export default HistoryLayoutP;
