import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import CancelScheduleSendIcon from "@material-ui/icons/CancelScheduleSend";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import HomeIcon from "@material-ui/icons/Home";
import DescriptionIcon from "@material-ui/icons/Description";
import ListItemText from "@material-ui/core/ListItemText";
import FeedbackIcon from "@material-ui/icons/Feedback";
import { Link, useRouteMatch } from "react-router-dom";
import { getFromStorage } from "../../utils/storage";
import axios from "axios";

export const MainListItems = () => {
  const { url } = useRouteMatch();
  const [data, setData] = useState([]);
  const { role } = getFromStorage("the_main_app_role");
  const { workPlace } = getFromStorage("the_main_app_workPlace");

  useState(() => {
    axios
      .get("http://localhost:5000/user/:token")
      .then((data) => setData(data.data.user));
    console.log(data);
  }, []);

  return (
    <div>
      {role === "admin" && workPlace === "welfare" && (
        <>
          <ListItem button component={Link} to={url}>
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={role} />
          </ListItem>
          <ListItem button component={Link} to={url}>
            <ListItemIcon>
              <LocationOnIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={workPlace} />
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
          <ListItem button component={Link} to={`${url}/feedbacks`}>
            <ListItemIcon>
              <FeedbackIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Feedbacks" />
          </ListItem>
          <ListItem button component={Link} to={`${url}/users`}>
            <ListItemIcon>
              <SupervisedUserCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button component={Link} to={`${url}/rejected-students`}>
            <ListItemIcon>
              <CancelScheduleSendIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Rejected Applications" />
          </ListItem>
        </>
      )}

      {role === "warden" && workPlace === workPlace && (
        <>
          <ListItem button component={Link} to={url}>
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={role} />
          </ListItem>
          <ListItem button component={Link} to={url}>
            <ListItemIcon>
              <LocationOnIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={workPlace} />
          </ListItem>
          <ListItem button component={Link} to={`${url}/o`}>
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
              <AssignmentIndIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Hostels" />
          </ListItem>
          <ListItem button component={Link} to={`${url}/feedback`}>
            <ListItemIcon>
              <FeedbackIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Feedbacks" />
          </ListItem>
        </>
      )}

      {role === "dean" && workPlace === workPlace && (
        <>
          <ListItem button component={Link} to={url}>
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={role} />
          </ListItem>
          <ListItem button component={Link} to={url}>
            <ListItemIcon>
              <LocationOnIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={workPlace} />
          </ListItem>
          <ListItem button component={Link} to={`${url}/applications`}>
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
          <ListItem button component={Link} to={`${url}/feedback`}>
            <ListItemIcon>
              <FeedbackIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Feedbacks" />
          </ListItem>
        </>
      )}
    </div>
  );
};
