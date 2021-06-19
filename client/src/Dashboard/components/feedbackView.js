import React from "react";
import Feedback from "./feedback";
import EditFeedback from "./pendingReply";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <EditFeedback />
      <br />
      <br />
      <br />
      <Feedback />
    </React.Fragment>
  );
};

export default Layout;
