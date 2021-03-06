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

import InputBase from "@material-ui/core/InputBase";

import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import TablePagination from "@material-ui/core/TablePagination";
import { getFromStorage } from "../../utils/storage";

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
export default function Hostels() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { workPlace } = getFromStorage("the_main_app_workPlace");
  const { role } = getFromStorage("the_main_app_role");
  const [searchTerm, setSearchTerm] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (_id) => {
    axios
      .delete(`/hostels/${_id}`)
      .then(setData((data) => data.filter((datum) => datum._id !== _id)))
      .catch(console.log("not deleted"));
  };

  useState(() => {
    axios
      .get("http://localhost:5000/hostels/")
      .then((data) => setData(data.data.hostels));
  }, []);

  //   console.log(data);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Hostel Details
            </Typography>{" "}
            <Button
              variant="outlined"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
              type="input"
              marginRight="10px"
            >
              <SearchIcon />

              <InputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Button>
            {role === "admin" && workPlace === "welfare" && (
              <Button
                variant="outlined"
                color="inherit"
                type="link"
                href="/dashboard/createhostel"
              >
                Create Hostel
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Name</b>
            </TableCell>
            <TableCell>
              {" "}
              <b>Warden</b>
            </TableCell>
            <TableCell>
              {" "}
              <b>Sub-Warden</b>
            </TableCell>
            <TableCell>
              {" "}
              <b>Contact-No</b>
            </TableCell>
            <TableCell>
              {" "}
              <b>Address</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .filter((datum) => {
              if (searchTerm == "") {
                return datum;
              } else if (
                datum.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return datum;
              }
            })
            .map((datum) => (
              <TableRow key={datum.name}>
                <TableCell>{datum.name}</TableCell>
                <TableCell>{datum.warden}</TableCell>
                <TableCell>{datum.subWarden}</TableCell>
                <TableCell>{datum.contactNo}</TableCell>
                <TableCell>{datum.address}</TableCell>
                {role === "admin" && workPlace === "welfare" && (
                  <>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        href={`/dashboard/hosteledit/${datum._id}`}
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
                  </>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
