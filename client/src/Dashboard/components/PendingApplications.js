import React, { useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import axios from "axios";
import { Button } from "@material-ui/core";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function PendingApplications() {
  const classes = useStyles();
  const [data, setData] = useState([]);

  const handleDelete = (_id) => {
    axios
      .delete(`/students/${_id}`)
      .then(setData((data) => data.filter((datum) => datum._id !== _id)))
      .catch(console.log("not deleted"));
  };

  useState(() => {
    axios.get("/students").then((data) => setData(data.data.students));
  }, []);

  return (
    <React.Fragment>
      <Title>Application Pending Approval</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Reg. No.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Faculty</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((datum) => (
            <TableRow key={datum._id}>
              <TableCell>{datum.regNo}</TableCell>
              <TableCell>{datum.fullName}</TableCell>
              <TableCell>{datum.faculty}</TableCell>{" "}
              <TableCell align="right">
                <Button
                  variant="contained"
                  // href={`/view-student/${datum._id}`}
                  href={`/create-pdf/${datum._id}`}
                  color="primary"
                >
                  View
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
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more pending Applications
        </Link>
      </div>
    </React.Fragment>
  );
}
