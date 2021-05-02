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
  const { workPlace } = getFromStorage("the_main_app_workPlace");
  const { role } = getFromStorage("the_main_app_role");

  const handleDelete = (_id) => {
    axios
      .delete(`/students/${_id}`)
      .then(setData((data) => data.filter((datum) => datum._id !== _id)))
      .catch(console.log("not deleted"));
  };

  useState(() => {
    let query;

    if (role === ROLE.DEAN) {
      axios
        .get(`/students?faculty=${workPlace}&isVerified=true`)
        .then((data) => setData(data.data.students));
    } else if (role === ROLE.WARDEN) {
      axios
        .get(`/students?preference=${workPlace}&isVerified=true`)
        .then((data) => setData(data.data.students));
    } else if (role === ROLE.ADMIN) {
      axios
        .get("/students&isVerified=true")
        .then((data) => setData(data.data.students));
    }

    // switch (role) {
    //   case ROLE.DEAN:
    //     query = `/students?faculty=${workPlace}`;
    //     break;
    //   case ROLE.WARDEN:
    //     query = `/students?preference=${workPlace}`;
    //     break;
    //   case ROLE.ADMIN:
    //     query = "";
    //     break;
    //   default:
    //     query = false;
    // }

    // if (query) {
    //   axios.get("/students").then((data) => setData(data.data.students));
    // }
  }, []);

  return (
    <React.Fragment>
      <Title>Application Pending Approval</Title>
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
              <b>Student Details</b>
            </TableCell>
            <TableCell>
              <b>Action</b>
            </TableCell>
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
