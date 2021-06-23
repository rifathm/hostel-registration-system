import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles, fade } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import InputBase from "@material-ui/core/InputBase";

import SearchIcon from "@material-ui/icons/Search";

import { MainListItems } from "./components/listItems";
import ContextMenu from "./components/ContextMenu";
import Copyright from "../components/Copyright";
import { useRouteMatch, Switch, Route, Redirect } from "react-router-dom";
import Students from "./views/Students";
import Applications from "./views/Applications";
import Users from "./views/Users";
import Settings from "./views/Settings";
import { Paper, Grid } from "@material-ui/core";
import PendingApplications from "./components/PendingApplications";
import Pending from "./views/Applications";
import Statics from "./components/UserStatics";
import Chart from "./components/StudentsStatics";
import Hostel from "./components/HostelStatics";
import EditProfile from "./views/EditUserProfile";
import EditHostel from "./views/EditHostel";
import CreateHostel from "./components/CreateHostel";
import createuser from "./components/createuser";
import Hostels from "./views/Hostels";
import EditFeedback from "./components/EditFeedback";
import table from "./components/table";
import Feedback from "./components/feedback";
import Reject from "./components/rejected-students";
import search from "./components/search";
import SelectHostel from "./components/selectHostel";
import feedback from "./components/feedbackView";
import { getFromStorage } from "../utils/storage";

import { withRouter } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 10px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "true",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },

  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Dashboard = ({ history }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  try {
    const { token } = getFromStorage("the_main_app");
  } catch {
    history.push("/");
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const { path, url } = useRouteMatch();
  const auth = false;
  console.log({ path, url });

  return (
    <div className={classes.root}>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <img
              src="/assets/images/LOGOUOJ.png"
              className="img-fluid rounded-circle"
              height="50"
              width="50"
              alt="LOGOUOJ"
            />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            // noWrap
            className={classes.title}
          >
            Hostel Registration System
          </Typography>

          <ContextMenu />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List dense>
          <MainListItems />
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            <Route exact path={path}>
              <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={4} lg={4}>
                  <Paper className={fixedHeightPaper}>
                    <Chart />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                  <Paper className={fixedHeightPaper}>
                    <Hostel />
                  </Paper>
                </Grid>
                {/* Recent Statics */}
                <Grid item xs={12} md={4} lg={4}>
                  <Paper className={fixedHeightPaper}>
                    <Statics />
                  </Paper>
                </Grid>
                Pending Applications
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <PendingApplications />
                  </Paper>
                </Grid>
              </Grid>
            </Route>
            {/* <Route path={`${path}/user/edit`} component={EditProfile} /> */}
            <Route path={`${path}/hostel/edit`} component={EditHostel} />
            <Route path={`${path}/students`} component={Students} />
            <Route path={`${path}/applications`} component={Applications} />
            <Route path={`${path}/application1`} component={Pending} />
            <Route path={`${path}/Hostel`} component={Hostels} />
            <Route path={`${path}/profile/:id`} component={EditProfile} />
            <Route path={`${path}/hosteledit/:id`} component={EditHostel} />
            <Route path={`${path}/users`} component={Users} />
            <Route path={`${path}/settings`} component={Settings} />
            <Route path={`${path}/createhostel`} component={CreateHostel} />
            <Route path={`${path}/createuser`} component={createuser} />
            <Route path={`${path}/table`} component={table} />
            <Route path={`${path}/feedback`} component={Feedback} />
            <Route path={`${path}/rejected-students`} component={Reject} />
            <Route path={`${path}/search`} component={search} />
            <Route path={`${path}/feed-back/:id`} component={EditFeedback} />
            <Route
              path={`${path}/select-hostel/:id`}
              component={SelectHostel}
            />
            <Route path={`${path}/feedbacks`} component={feedback} />
          </Switch>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
};
export default withRouter(Dashboard);
