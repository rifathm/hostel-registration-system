import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));
export default function Feedback() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [setPage] = React.useState(0);

  const [setRowsPerPage] = React.useState(5);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (_id) => {
    axios
      .delete(`/feedback/${_id}`)
      .then(setData((data) => data.filter((datum) => datum._id !== _id)))
      .catch(console.log("not deleted"));
  };

  useState(() => {
    axios
      .get("http://localhost:5000/feedback/")
      .then((data) => setData(data.data.inquerys));
    console.log(data);
  }, []);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Student Feedbacks
            </Typography>{" "}
          </Toolbar>
        </AppBar>
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Firstname</TableCell>
            <TableCell>Contact-No</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Contact-Via</TableCell>
            <TableCell>Feedback</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((datum) => (
            <TableRow key={datum._id}>
              <TableCell>{datum.firstname}</TableCell>
              <TableCell>{datum.telnum}</TableCell>
              <TableCell>{datum.email}</TableCell>
              <TableCell>{datum.contactType}</TableCell>
              <TableCell>{datum.message}</TableCell>

              <TableCell align="right">
                <Button
                  variant="contained"
                  href={`/dashboard/feedback/${datum._id}`}
                  color="primary"
                >
                  Edit
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  onClick={() => handleDelete(datum._id)}
                  color="secondary"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
