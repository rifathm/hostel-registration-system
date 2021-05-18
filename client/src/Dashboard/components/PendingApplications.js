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

  const handleVerify = (_id) => {
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
          `/students?preference=${workPlace}&isVerified=false&isVerifiedDean=true&isVerifiedWarden=false`
        )
        .then((data) => setData(data.data.students));
    } else if (role === ROLE.ADMIN) {
      axios
        .get(
          `/students&isVerified=false&isVerifiedDean=true&isVerifiedWarden=true`
        )
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

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Title>Application Pending Approval</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Reg. No.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Faculty</TableCell>
            <TableCell>Hostel(Stayed)</TableCell>
            <TableCell>Year Of Study</TableCell>
            <TableCell>Action</TableCell>
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
                      <MenuItem>
                        <a href={`/view-student/${datum._id}`}>View Details</a>
                      </MenuItem>
                      <MenuItem onClick={() => handleVerify(datum._id)}>
                        <a>Approve</a>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <a>Reject</a>
                      </MenuItem>
                      <MenuItem onClick={() => handleDelete(datum._id)}>
                        Delete
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
              </TableCell>
              {/* <Button
                  variant="contained"
                  // href={`/view-student/${datum._id}`}
                  href={`/create-pdf/${datum._id}`}
                  color="primary"
                >
                  View
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button>
                  // variant="contained" // onClick=
                  {() => handleDelete(datum._id)}
                  // color="secondary" // // Delete
                  <Drawer />
                </Button> */}
              {/* </TableCell> */}
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
