import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Cards from "./Cards";
import { useLocation } from "react-router-dom";
import OneTrainingdataGrid from "./Datagrid";
import DonutChart from "./DonutChart";
import OneTrainingColumn from "./Column";
import OneTrainingBarHorizontal from "./BarHorizontal";
import { Grid, Paper, Stack, Typography } from "@mui/material";
import OneTrainingLine from "./Line";
import OneTrainingDonutChartTs from "./DonutChartTs"
import OneTrainingDonutChartTP from "./DonutChartTP"
import OneTrainingDonutChartPhar from "./DonutChartPhar"
import axios from "axios";

const OverviewOneTrainingLayoutP = () => {

  // fetch the last training  :

 
 const [loading , setLoading] = useState(true)
const [idMax, setIdMax] = useState();
 useEffect(() => {
  const interval = setInterval(() => {
  axios
    .get("http://localhost:8000/overviewP/MaxTrainingP")
    .then((response) => {
      setIdMax((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(response)) {
          //console.log("New data....");
          return response.data[0].maxid;
        }
        return prev;
      });
    });
   
  }, 1000);
  return () => clearInterval(interval);
}, [idMax]);


  
  //const medicament = location.state.medi;
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
   <Typography
          color="#113f67"
          sx={{  marginBottom: "2%", marginTop: "2%" }}
          variant="h9"
          gutterBottom
        >
         Traitement Prix ppa      <strong>{idMax}</strong>
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
            <Grid item xs={12} md={7.5} sm={12} padding={0} >
              <Stack spacing={4} >
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
                      <Cards type={CasPerMedicament } idMax={idMax} />
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
                        <OneTrainingdataGrid idMax={idMax} />{" "}
                      </ItemGrid>
                      
                    </Grid>

                    
    
                  </Grid>
                </ItemStack>
                
                
              </Stack>
            </Grid>


            <Grid item xs={12} md={4} sm={12} >
              <ItemGrid sx={{ padding: "3%" }}>
                <DonutChart idMax={idMax} />
              </ItemGrid>
              <ItemGrid sx={{ padding: "3%", marginTop: "10px"  }}>
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
            <Grid item xs={3.9} sx={{ backgroundColor: "transparent" }}>
              <ItemGrid sx={{ padding: "3%" }}>
              <OneTrainingDonutChartTs idMax={idMax} />
              </ItemGrid>
              
              
            </Grid>
            <Grid item xs={3.9} sx={{ backgroundColor: "transparent" }}>
              <ItemGrid sx={{ padding: "3%" }}>
              <OneTrainingDonutChartTP idMax={idMax} />
              </ItemGrid>
              
              
            </Grid>
            <Grid item xs={3.9} sx={{ backgroundColor: "transparent" }}>
              <ItemGrid sx={{ padding: "3%" }}>
              <OneTrainingDonutChartPhar idMax={idMax} /> 
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
                <OneTrainingLine idMax={idMax} />
              </ItemGrid>
            </Grid>
          </Grid>
        </ItemStack>
        
        
                </Stack>
    </>
  );
};

export default OverviewOneTrainingLayoutP;
