import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate, useLocation } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import { makeStyles } from "@mui/styles";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SubjectOutlined from "@mui/icons-material/SubjectOutlined";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  //const useStyles = (theme) => ({
  page: {
    background: "#f9f9f9",
    width: "100%",
    marginTop: 74,
    paddingLeft: 10,
  },
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: 74,
  },
  active: {
    background: "#f4f4f4",
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = [
    {
      text: "Home",

      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Release Notes",

      icon: <SubjectOutlined color="secondary" />,
      path: "/rel",
    },
    {
      text: "Create Note",
      icon: <AddCircleOutlineOutlined color="secondary" />,
      path: "/create",
    },
  ];

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            KARL STORZ -- Private ServiceNow UI
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <Drawer
          variant="permanent"
          classes={{ paper: classes.drawerPaper }}
          anchor="left"
          sx={{ width: drawerWidth }}
        >
          <div>
            <Typography variant="h6" sx={{ pl: 1 }}>
              Menue
            </Typography>
            <Divider />
          </div>

          {/* links/list section */}
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => navigate(item.path)}
                sx={{
                  background:
                    location.pathname === item.path ? "#f4f4f4" : null,
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        <div className={classes.page}>{children}</div>
      </div>
    </div>
  );
}
