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
import { FormGroup, Input, Label } from "reactstrap";

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
      .catch(alert("not deleted"));
  };

  useState(() => {
    let query;

    axios
      .get(`/feedback?&isReplied=false`)
      .then((data) => setData(data.data.inquerys));
  }, []);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Student Feedbacks
              <p font="small">Pending for Reply</p>
            </Typography>{" "}
          </Toolbar>
        </AppBar>
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Firstname</b>
            </TableCell>
            <TableCell>
              <b>Contact-No</b>
            </TableCell>
            <TableCell>
              <b>Email</b>
            </TableCell>
            <TableCell>
              <b>Contact-Via</b>
            </TableCell>
            <TableCell>
              <b>Feedback</b>
            </TableCell>
            <TableCell>
              <b>Reply</b>
            </TableCell>
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
                  href={`/dashboard/feed-back/${datum._id}`}
                  // onClick={() => handleDelete(datum._id)}
                  color="primary"
                >
                  Send
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
