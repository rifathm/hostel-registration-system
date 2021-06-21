import React from "react";

const Map = ({ location }) => {
  console.log(location);
  return (
    <iframe
      src={location}
      width="250"
      height="300"
      frameBorder="0"
      style={{ border: "0" }}
      allowFullScreen=""
      aria-hidden="false"
      tabIndex="0"
    ></iframe>
  );
};


export default Map;
