import { Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import Users from "../components/users";

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

function User() {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <Users />
      </Paper>
    </Grid>
  );
}

export default User;
