import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";

import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import HomeIcon from "@material-ui/icons/Home";
import DescriptionIcon from "@material-ui/icons/Description";
import ListItemText from "@material-ui/core/ListItemText";
import { Link, useRouteMatch } from "react-router-dom";
import { getFromStorage } from "../../utils/storage";
import axios from "axios";

export const MainListItems = () => {
  const { url } = useRouteMatch();
  const [data, setData] = useState([]);
  const storage = getFromStorage("the_main_app_role", "the_main_app_workPlace");

  useState(() => {
    axios
      .get("http://localhost:5000/user/:token")
      .then((data) => setData(data.data.user));
    console.log(data);
  }, []);
  // const storage1 = getFromStorage("the_main_app_workPlace");
  return (
    <div>
      {storage && storage.role === "admin" && storage.workPlace === "welfare" && (
        <>
          <ListItem button component={Link} to={url}>
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={storage.role} />
            <ListItemText primary={storage.workPlace} />
          </ListItem>
          <ListItem button component={Link} to={`${url}/Applications`}>
            <ListItemIcon>
              <DescriptionIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Applications" />
          </ListItem>
          <ListItem button component={Link} to={`${url}/students`}>
            <ListItemIcon>
              <AssignmentIndIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Students" />
          </ListItem>
          <ListItem button component={Link} to={`${url}/Hostel`}>
            <ListItemIcon>
              <HomeIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Hostels" />
          </ListItem>
          <ListItem button component={Link} to={`${url}/users`}>
            <ListItemIcon>
              <SupervisedUserCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </>
      )}

      {storage &&
        storage.role === "warden" &&
        storage.workPlace === " kondavil" && (
          <>
            <ListItem button component={Link} to={url}>
              <ListItemIcon>
                <DashboardIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={storage.role} />
              <ListItemText primary={storage.workPlace} />
            </ListItem>
            <ListItem button component={Link} to={`${url}/applications`}>
              <ListItemIcon>
                <DescriptionIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Applications" />
            </ListItem>
            <ListItem button component={Link} to={`${url}/Hostel`}>
              <ListItemIcon>
                <AssignmentIndIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Hostels" />
            </ListItem>
          </>
        )}

      {storage && storage.role === "dean" && storage.workPlace === " science" && (
        <>
          <ListItem button component={Link} to={url}>
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={storage.role} />
            <ListItemText primary={storage.workPlace} />
          </ListItem>
          <ListItem button component={Link} to={`${url}/applications`}>
            <ListItemIcon>
              <DescriptionIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Applications" />
          </ListItem>
        </>
      )}
    </div>
  );
};
