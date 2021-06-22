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
import { Input } from "reactstrap";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { hostels } from "../../utils/data";
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

    axios
      .get(`/students?isVerified=false&year=1`)
      .then((data) => setData(data.data.students));
  });

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenu1 = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleVerify = (_id) => {
    let query;

    axios
      .put(`/students/${_id}`, {
        isVerified: true,
      })
      .then(setData((data) => data.filter((datum) => datum._id !== _id)))
      .catch(console.log("not verified"));
    setAnchorEl(null);
  };

  const handleReject = (_id) => {
    let query;

    axios
      .put(`/students/${_id}`, { state: false })
      .then(setData((data) => data.filter((datum) => datum._id !== _id)))
      .catch(console.log("not verified"));
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Title>Application Pending Approval From 1st Year</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Reg. No.</b>
            </TableCell>
            <TableCell>
              <b>Name</b>
            </TableCell>
            <TableCell>
              <b>Faculty</b>
            </TableCell>
            <TableCell>
              <b>Hostel(Stayed)</b>
            </TableCell>
            <TableCell>
              <b>Year Of Study</b>
            </TableCell>
            <TableCell>
              <b>Select Hostel</b>
            </TableCell>
            <TableCell>
              <b>Action</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((datum) => (
              <TableRow key={datum._id}>
                <TableCell>{datum.regNo}</TableCell>
                <TableCell>{datum.fullName}</TableCell>
                <TableCell>{datum.faculty}</TableCell>
                <TableCell>{datum.preference}</TableCell>
                <TableCell>{datum.year}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    href={`select-hostel/${datum._id}/`}
                    color="primary"
                  >
                    Select
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <div className={classes.root}>
                    <div>
                      <Button
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        variant="outlined"
                        color="primary"
                      >
                        Details
                      </Button>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={open}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={() => handleReject(datum._id)}>
                          <a>Reject</a>
                        </MenuItem>
                        <MenuItem onClick={handleMenu}> View Details</MenuItem>
                        <MenuItem onClick={() => handleDelete(datum._id)}>
                          Delete
                        </MenuItem>
                      </Menu>
                    </div>
                  </div>
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
