import React, { useState, useEffect } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import Badge from "@mui/material/Badge";
import { Box } from "@mui/system";
import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import axios from "axios";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const MenuAppBar = () => {


  //Notification count

  // get all the notifications with their status
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("http://localhost:8000/notification/AllNotification")
        .then((response) => {
         
          setNotifications((prev) => {
            if (JSON.stringify(prev) !== JSON.stringify(response.data)) {
              console.log("New data....");
              return response.data;
            }
            return prev;
          });
          
          
        });
    }, 1000);
    return () => clearInterval(interval);
  }, []);



  // to get the list of unseen ids and the lenght of this list ( as a list and not an objects)
  const [notificationsIds, setNotificationsIds] = useState([]);
  const [notificationsCount, setNotificationsCount] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("http://localhost:8000/notification/NotificationAllId")
        .then((response) => {
          setNotificationsIds(response.data);
          setNotificationsCount((prev) => {
            if (JSON.stringify(prev) !== JSON.stringify(response.data.length)) {
              console.log("New data....");
              return response.data.length;
            }
            return prev;
          });
          
        });
    }, 1000);
    return () => clearInterval(interval);
  }, [notificationsIds]);



  // for the menu of the acount , notifications ...
  const [anchorEl, setAnchorEl] = React.useState(null);


  // handle open for the notifications
    const handleMenu = async (event) => {
      setAnchorEl(event.currentTarget);
     
  }
  // handle close for the notifications  ==> change the status of notifications
  const handleClose = () => {
    setAnchorEl(null);
     // transform the list of object to an array ( array of ids )
     const arrayIds = notificationsIds.map(function (obj) {
      return obj.id;
    });
    //for each id in the ids table ==> update the seen   " , "
    if (notificationsIds.length != 0 && notificationsIds != undefined) {

      arrayIds.map((notifId) => { 
        axios
        .get("http://localhost:8000/notification/NotificationUpdate", {
          params: {
            ids: notifId,
          },
        })
        .then((response) => {
          setNotificationsIds([]);
        });
      })
  }
  };

 

  return (
    <Box sx={{ display: { xs: "none", md: "flex" } }}>
      <IconButton size="large" aria-label="show 4 new mails" color="inherit">
        <Badge badgeContent={6} color="error">
          <MailOutlineIcon sx={{ color: "#113f67", fontSize: 30 }} />
        </Badge>
      </IconButton>
      <IconButton
        size="large"
        aria-label="show new notifications"  {... notifications}
        color="inherit"
        onClick={handleMenu}
      >
        <Badge badgeContent={notificationsCount} color="error">
          <NotificationsOutlinedIcon sx={{ color: "#113f67", fontSize: 30 }} />
        </Badge>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        { notifications?.map((notification) => { 
          return ( 
            <MenuItem onClick={handleClose} sx={{ 
              backgroundColor : notification.seen === 1 ? "white" : "#ececec"  ,
              marginBottom :0}}> {notification?.status === 1 ?  <CheckCircleIcon  sx={{ color : "green" }}/>:<CancelIcon   sx={{ color : "red" }} /> } {  notification.msg}</MenuItem> 
           
           
          ) 
          
        })}
      </Menu>
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
      >
        <AccountCircle sx={{ color: "#113f67", fontSize: 35 }} />
      </IconButton>
    </Box>
  );
};

export default MenuAppBar;
