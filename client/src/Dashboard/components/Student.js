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
import InputBase from "@material-ui/core/InputBase";

import SearchIcon from "@material-ui/icons/Search";
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
  const [searchTerm, setSearchTerm] = useState("");
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
        .get(`/students?faculty=${workPlace}&isVerifiedDean=true`)
        .then((data) => setData(data.data.students));
    } else if (role === ROLE.WARDEN) {
      axios
        .get(`/students?selectedHostel=${workPlace}&isVerifiedWarden=true&`)
        .then((data) => setData(data.data.students));
    } else if (role === ROLE.ADMIN) {
      axios
        .get(
          `/students?isVerified=true&isVerifiedDean=true&isVerifiedWarden=true`
        )
        .then((data) => setData(data.data.students));
    }
  }, []);

  if (role === ROLE.ADMIN) {
    return (
      <React.Fragment>
        <Title>Student Details</Title>
        <Button
          variant="outlined"
          color="inherit"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          type="input"
          marginRight="10px"
        >
          <SearchIcon />

          <InputBase
            placeholder="Search here"
            inputProps={{ "aria-label": "search" }}
          />
        </Button>
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
                <b>Year Of Study</b>
              </TableCell>
              <TableCell>
                <b>Selected Hostel</b>
              </TableCell>
              <TableCell>
                <b>Student Details</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .filter((datum) => {
                if (searchTerm == "") {
                  return datum;
                } else if (
                  datum.regNo.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return datum;
                }
              })
              .map((datum) => (
                <TableRow key={datum._id}>
                  <TableCell>{datum.regNo}</TableCell>
                  <TableCell>{datum.fullName}</TableCell>
                  <TableCell>{datum.year}</TableCell>
                  <TableCell>{datum.selectedHostel}</TableCell>
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
  } else {
    return (
      <React.Fragment>
        <Title>Student Details</Title>
        <Button
          variant="outlined"
          color="inherit"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          type="input"
          marginRight="10px"
        >
          <SearchIcon />

          <InputBase
            placeholder="Search here"
            inputProps={{ "aria-label": "search" }}
          />
        </Button>
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
                <b>Year Of Study</b>
              </TableCell>
              <TableCell>
                <b>Student Details</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .filter((datum) => {
                if (searchTerm == "") {
                  return datum;
                } else if (
                  datum.regNo.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return datum;
                }
              })
              .map((datum) => (
                <TableRow key={datum._id}>
                  <TableCell>{datum.regNo}</TableCell>
                  <TableCell>{datum.fullName}</TableCell>
                  <TableCell>{datum.year}</TableCell>{" "}
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
}
