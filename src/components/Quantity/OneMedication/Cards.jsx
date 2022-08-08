import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Grid, Stack, Paper, Divider, Avatar } from "@mui/material";
import WomanIcon from "@mui/icons-material/Woman";
import ManIcon from "@mui/icons-material/Man";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
const Titre = styled(Typography)(({ theme }) => ({
  fontSize: 18,
}));

const OneMedicationGenderCards = ({ type }) => {
  const ItemStack = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary,
    boxShadow: "none",
    paddingLeft: theme.spacing(3),
  }));

  const useStyles = makeStyles(() => ({
    wrapIcon: {
      alignItems: "center",
      display: "flex",
    },
  }));

  // id of training
  const location = useLocation();
  const idHistory = location.state.idHistory;
  const medicament = location.state.medicament;

  // cards params and
  const [result, setResult] = useState(0);

  const link = (type) => {
    if (type === "T") {
      return "http://localhost:8000/DetailsOfMedicationQ/CountMedication/";
    } else {
      return "http://localhost:8000/DetailsOfMedicationQ/CountGenderOneMedication/";
    }
  };
  var request = link(type);

  useEffect(() => {
    axios
      .get(request, {
        params: {
          idEntrainement: idHistory,
          numEnr: medicament,
          gender: type,
        },
      })
      .then((response) => {
        // get the response

        setResult(response.data[0].count);
      });
  }, []);
  // title of cards
  const title = (type) => {
    if (type === "F") {
      return " Female";
    }
    if (type === "M") {
      return "Male";
    }
    if (type === "T") {
      return "Tout";
    }
  };

  // icons of cards
  const icon = (type) => {
    if (type === "F") {
      return <WomanIcon sx={{ fontSize: 60, color: "#38598b" }} />;
    }
    if (type === "M") {
      return <ManIcon sx={{ fontSize: 60, color: "#38598b" }} />;
    }
    if (type === "T") {
      return <PeopleAltIcon sx={{ fontSize: 40, color: "#38598b" }} />;
    }
  };

  return (
    <Card
      elevation={2}
      sx={{ height: "100%", backgroundColor: "white", borderRadius: "10px" }}
    >
      <Grid container xs={12} justifyContent="space-between" spacing={2}>
        <Grid item spacing={0} xs={5} sx={{ backgroundColor: "transparent" }}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <ItemStack elevation={0} sx={{ backgroundColor: "transparent" }} />
            <ItemStack elevation={0} sx={{ backgroundColor: "transparent" }}>
              {icon(type)}
            </ItemStack>
            <ItemStack elevation={0} sx={{ backgroundColor: "transparent" }} />
          </Stack>
        </Grid>
        <Grid item spacing={0} xs={5} sx={{ backgroundColor: "transparent" }}>
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%" }}
          >
            <ItemStack elevation={0} sx={{ backgroundColor: "transparent" }}>
              <Typography color="#38598b" variant="h6">
                {title(type)}
              </Typography>
            </ItemStack>
            <ItemStack elevation={0} sx={{ backgroundColor: "transparent" }}>
              <Typography
                color="#38598b"
                variant="h5"
                sx={{ fontWeight: "bold" }}
              >
                {result}
              </Typography>
            </ItemStack>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};

export default OneMedicationGenderCards;
