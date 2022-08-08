import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import { routes } from "./routes";
import { Grid, Icon, Menu, MenuItem, Stack } from "@mui/material";
import { items } from "./items";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuAppBar from "./MenuAppBar";
const drawerWidth = 300;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        mt={7}
      >
        <DashboardIcon sx={{ fontSize: 40, color: "white" }} />
        <Typography
          variant="h4"
          color="white"
          sx={{ fontWeight: "bold", paddingTop: "2%" }}
        >
          Dashboard
        </Typography>
      </Stack>
      {/*<Divider sx={{ backgroundColor: "white" }} />*/}

      <Toolbar />
      <List>
        {items.map((item) => {
          if (item?.type === "item") {
            return (
              <Link to={item.path}>
                <ListItem key={item.label} sx={{ padding: "10px" }}>
                  <ListItemButton>
                    <ListItemIcon>
                      <Icon sx={{ color: "white" }}>{item.icon}</Icon>
                    </ListItemIcon>
                    <ListItemText
                      sx={{ color: "white" }}
                      primary={item.label}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            );
          }

          return (
            <Divider
              variant="middle"
              textAlign="left"
              sx={{ color: "#606470" }}
            >
              {item.label}
            </Divider>
          );
        })}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <BrowserRouter>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor: "white",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <MenuAppBar />
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
          }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: "#113f67",
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: "#113f67",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            backgroundColor: "#e7eaf6",
          }}
        >
          <Toolbar />

          <Grid
            container
            xs={12}
            md={12}
            style={{
              display: "flex",
              paddingTop: 60,
            }}
          >
            <Routes>
              {routes.map((item, Index) => (
                <Route
                  exact
                  Key={Index}
                  path={item.path}
                  element={<item.component />}
                />
              ))}
              <Route path={"*"} element={<Navigate to={"/overview"} />} />
            </Routes>
          </Grid>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
