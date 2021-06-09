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
import { getFromStorage } from "../../utils/storage";
import { ROLE } from "../../utils/roles";

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
  const { role } = getFromStorage("the_main_app_role");

  useState(() => {
    let query;

    if (role === ROLE.ADMIN) {
      axios
        .get(`/students?&state=false`)
        .then((data) => setData(data.data.students));
    }
  }, []);

  return (
    <React.Fragment>
      <Title>Rejected Student Details</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Reg. No</b>
            </TableCell>
            <TableCell>
              <b>Name</b>
            </TableCell>
            <TableCell>
              <b>Faculty</b>
            </TableCell>
            <TableCell>
              <b>Year Of Study</b>
            </TableCell>
            <TableCell>
              <b>Student Details</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((datum) => (
            <TableRow key={datum._id}>
              <TableCell>{datum.regNo}</TableCell>
              <TableCell>{datum.fullName}</TableCell>
              <TableCell>{datum.faculty}</TableCell>
              <TableCell>{datum.year}</TableCell>
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
