import React, { useState } from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);

  useState(() => {
    axios
      .get("http://localhost:5000/hostels/")
      .then((data) => setData(data.data.hostels));
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="search"
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
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
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
