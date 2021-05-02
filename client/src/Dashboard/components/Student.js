import { Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import PendingApplications from "../components/PendingApplications";
import clsx from "clsx";
import Statics from "../components/UserStatics";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

function Students() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Statics />
          </Paper>
        </Grid>
        {/* Pending Applications */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <PendingApplications />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Students;
