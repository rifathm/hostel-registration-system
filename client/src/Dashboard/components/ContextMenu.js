import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { deleteFromStorage, getFromStorage } from "../../utils/storage";
import { withRouter, Link } from "react-router-dom";

const ContextMenu = ({ history }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const logOut = () => {
    const { token } = getFromStorage("the_main_app");

    fetch("/user/logout?token=" + token)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.success) {
          deleteFromStorage("the_main_app");
          deleteFromStorage("the_main_app_role");
          deleteFromStorage("the_main_app_workPlace");
          history.push("/");
        }
      });
    handleClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Open Menu
      </Button> */}
      <IconButton
        color="inherit"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <AccountCircleIcon fontSize="default" />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={logOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default withRouter(ContextMenu);
