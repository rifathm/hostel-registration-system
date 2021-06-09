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
import { FormGroup, Input, Label } from "reactstrap";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
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

  const handleVerify1 = (_id) => {
    axios
      .put(`/students/${_id}`, { isVerified: true })
      .then(setData((data) => data.filter((datum) => datum._id !== _id)))
      .catch(console.log("not verified"));
  };

  useState(() => {
    let query;

    if (role === ROLE.DEAN) {
      axios
        .get(
          `/students?faculty=${workPlace}&isVerified=false&isVerifiedDean=false&isVerifiedWarden=false`
        )
        .then((data) => setData(data.data.students));
    } else if (role === ROLE.WARDEN) {
      axios
        .get(
          `/students?preference=${workPlace}&isVerified=false&isVerifiedDean=true&isVerifiedWarden=false&year=4`
        )
        .then((data) => setData(data.data.students));
    } else if (role === ROLE.ADMIN) {
      axios
        .get(
          `/students?&isVerified=false&isVerifiedDean=true&isVerifiedWarden=true`
        )

        .then((data) => setData(data.data.students));
    }
  }, []);

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
    if (role === ROLE.DEAN) {
      if (data.year === "1") {
        axios
          .put(`/students/${_id}`, {
            isVerifiedDean: true,
            isVerifiedWarden: true,
          })
          .then(setData((data) => data.filter((datum) => datum._id !== _id)))
          .catch(console.log("not verified"));
        setAnchorEl(null);
      } else {
        axios
          .put(`/students/${_id}`, { isVerifiedDean: true })
          .then(setData((data) => data.filter((datum) => datum._id !== _id)))
          .catch(console.log("not verified"));
        setAnchorEl(null);
      }
    } else if (role === ROLE.WARDEN) {
      axios
        .put(`/students/${_id}`, { isVerifiedWarden: true })
        .then(setData((data) => data.filter((datum) => datum._id !== _id)))
        .catch(console.log("not verified"));
      setAnchorEl(null);
    } else if (role === ROLE.ADMIN) {
      axios
        .put(`/students/${_id}`, {
          isVerified: true,
          selectedHostel: "Kondavil Male Hostel",
        })
        .then(setData((data) => data.filter((datum) => datum._id !== _id)))
        .catch(console.log("not verified"));
      setAnchorEl(null);
    }
  };

  const handleReject = (_id) => {
    let query;
    if (role === ROLE.DEAN) {
      if (data.year === "1") {
        axios
          .put(`/students/${_id}`, {
            state: false,
          })
          .then(setData((data) => data.filter((datum) => datum._id !== _id)))
          .catch(console.log("not verified"));
        setAnchorEl(null);
      } else {
        axios
          .put(`/students/${_id}`, { state: false })
          .then(setData((data) => data.filter((datum) => datum._id !== _id)))
          .catch(console.log("not verified"));
        setAnchorEl(null);
      }
    } else if (role === ROLE.WARDEN) {
      axios
        .put(`/students/${_id}`, { state: false })
        .then(setData((data) => data.filter((datum) => datum._id !== _id)))
        .catch(console.log("not verified"));
      setAnchorEl(null);
    } else if (role === ROLE.ADMIN) {
      axios
        .put(`/students/${_id}`, { state: false })
        .then(setData((data) => data.filter((datum) => datum._id !== _id)))
        .catch(console.log("not verified"));
      setAnchorEl(null);
    }
  };

  if (role === ROLE.ADMIN) {
    return (
      <React.Fragment>
        <Title>Application Pending Approval</Title>
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
            {data.map((datum) => (
              <TableRow key={datum._id}>
                <TableCell>{datum.regNo}</TableCell>
                <TableCell>{datum.fullName}</TableCell>
                <TableCell>{datum.faculty}</TableCell>
                <TableCell>{datum.preference}</TableCell>
                <TableCell>{datum.year}</TableCell>
                <TableCell>
                  <Input
                    type="select"
                    placeholder="Select Hostel"
                    // onChange={this.handleInputChange}
                    // value={selectedHostel}
                    //onBlur={this.handleBlur("selectedHostel")}
                  >
                    <option value="Kondavil Male Hoste">
                      Kondavil Male Hostel
                    </option>
                    <option value="Kondavil Female Hoste">
                      Kondavil Female Hostel
                    </option>
                    <option value="Jaffna">Jaffna</option>
                  </Input>
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
                        <MenuItem onClick={() => handleVerify(datum._id)}>
                          <a>Approve</a>
                        </MenuItem>
                        <MenuItem onClick={() => handleReject(datum._id)}>
                          <a>Reject</a>
                        </MenuItem>
                        <MenuItem onClick={handleMenu}></MenuItem>
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
  } else {
    return (
      <React.Fragment>
        <Title>Application Pending Approval</Title>
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
            {data.map((datum) => (
              <TableRow key={datum._id}>
                <TableCell>{datum.regNo}</TableCell>
                <TableCell>{datum.fullName}</TableCell>
                <TableCell>{datum.faculty}</TableCell>
                <TableCell>{datum.preference}</TableCell>
                <TableCell>{datum.year}</TableCell>

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
                        <MenuItem onClick={() => handleVerify(datum._id)}>
                          <a>Approve</a>
                        </MenuItem>
                        <MenuItem onClick={() => handleReject(datum.id)}>
                          <a>Reject</a>
                        </MenuItem>
                        <MenuItem onClick={handleMenu}></MenuItem>
                        <MenuItem onClick={() => handleDelete(datum._id)}>
                          Delete
                        </MenuItem>
                      </Menu>
                    </div>
                  </div>
                </TableCell>
                <TableCell></TableCell>
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
