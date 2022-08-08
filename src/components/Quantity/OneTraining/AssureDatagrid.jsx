import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import moment from "moment";

import { Stack, Paper, Typography, Divider, Box, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";

import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const OneTrainingAssureDatagrid = () => {
  // item stack
  const ItemStack = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(0),

    color: theme.palette.text.secondary,
  }));

  // get the data

  const location = useLocation();

  //data
  const [tableData, setTableData] = useState([]);

  // fetch the data :
  const idHistory = location.state.idHistory;

  useEffect(() => {
    axios
      .get("http://localhost:8000/DetailsOfTrainingQ/CountAssuresSuspected/", {
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

  //Details
  const Data = tableData.map(({ no_assure, count_assure, ...others }) => ({
    no_assure,
    count_assure,
    Details: [{ ...others }],
  }));

  // sorting data
  const SortedData = Data.sort((a, b) => {
    return b.count_assure - a.count_assure;
  });
  // get the first 5 items
  const size = 5;
  const items = SortedData.slice(0, size);

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            {row.no_assure}
          </TableCell>
          <TableCell align="center">{row.count_assure}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  Details
                </Typography>

                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Affection</TableCell>
                      <TableCell align="center">Age</TableCell>
                      <TableCell align="center">Gender</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.Details.map((historyRow) => (
                      <TableRow key={historyRow.affection}>
                        <TableCell align="center" component="th" scope="row">
                          {historyRow.affection}
                        </TableCell>
                        <TableCell align="center">{historyRow.age}</TableCell>
                        <TableCell align="center">
                          {historyRow.gender}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }

  // go to the details of one medication
  //Navigation
  const navigate = useNavigate();
  const navigateToOneTrainingSeeMore = (row) => {
    navigate("/history/quantity/oneTraining/SeeMore", {
      state: { idHistory: idHistory },
    });
  };

  return (
    <Stack
      direction="column"
      alignItems="stretch"
      spacing={0}
      sx={{
        height: "100%",
        width: "100%",
        padding: "3%",
      }}
    >
      <ItemStack elevation={0}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Typography
            color="black"
            sx={{ fontWeight: "bold", marginBottom: "4%", marginTop: "2%" }}
            variant="h6"
            gutterBottom
          >
            the 5 insured most suspicious
          </Typography>
          <Chip
            label=" See more"
            variant="outlined"
            sx={{ marginTop: "2%" }}
            onClick={navigateToOneTrainingSeeMore}
          />
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
        }}
      >
        <TableContainer sx={{ border: "none" }}>
          <Table aria-label="Assuré table">
            <TableHead sx={{ backgroundColor: " #e7eaf6" }}>
              <TableRow>
                <TableCell />
                <TableCell align="center">N° d'assuré</TableCell>
                <TableCell align="center">Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <Row key={row.no_assure} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ItemStack>
    </Stack>
  );
};

export default OneTrainingAssureDatagrid;
