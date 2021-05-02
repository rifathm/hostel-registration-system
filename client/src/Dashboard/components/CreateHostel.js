import React, { Component } from "react";
import "whatwg-fetch";
import { FormGroup, Input, Label } from "reactstrap";

class createhostel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      token: "",
      Error: "",
      warden: "",
      name: "",
      address: "",
      subWarden: "",
      location: "",
    };

    this.onTextboxChangeName = this.onTextboxChangeName.bind(this);
    this.onTextboxChangeSubWarden = this.onTextboxChangeSubWarden.bind(this);
    this.onTextboxChangewarden = this.onTextboxChangewarden.bind(this);
    this.onTextboxChangeaddress = this.onTextboxChangeaddress.bind(this);
    this.onTextboxChangeContactNo = this.onTextboxChangeContactNo.bind(this);
    this.onTextboxChangelocation = this.onTextboxChangelocation.bind(this);

    this.onSignUp = this.onSignUp.bind(this);
  }

  onTextboxChangeName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  onTextboxChangeSubWarden(event) {
    this.setState({
      subWarden: event.target.value,
    });
  }

  onTextboxChangewarden(event) {
    this.setState({
      warden: event.target.value,
    });
  }

  onTextboxChangeaddress(event) {
    this.setState({
      address: event.target.value,
    });
  }

  onTextboxChangeContactNo(event) {
    this.setState({
      contactNo: event.target.value,
    });
  }

  onTextboxChangelocation(event) {
    this.setState({
      location: event.target.value,
    });
  }

  onSignUp() {
    //grab State
    const {
      warden,
      address,
      name,
      subWarden,
      contactNo,
      location,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // POST request to backend
    fetch("http://localhost:5000/hostels/createHostel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        warden: warden,
        address: address,
        name: name,
        subWarden: subWarden,
        contactNo: contactNo,
        location: location,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          this.setState({
            Error: json.message,
            isLoading: false,
            name: "",
            subWarden: "",
            warden: "",
            contactNo: "",
            address: "",
            location: "",
          });
        } else {
          this.setState({
            Error: json.message,
            isLoading: false,
          });
        }
      });
  }

  render() {
    const {
      isLoading,
      //token,
      warden,
      name,
      address,
      subWarden,
      contactNo,
      Error,
      location,
    } = this.state;

    if (isLoading) {
      return <div>Succesfully Created Hostel </div>;
    }

    return (
      <div>
        <div className="col-8 ">
          {Error ? <p>{Error}</p> : null}
          <div className="row">
            <div className="col-12 ">
              <p>Create Hostel</p>
            </div>
          </div>

          <FormGroup>
            <Label htmlFor="name">name</Label>
            <Input
              type="name"
              name="name"
              placeholder="Enter hostel name"
              value={name}
              onChange={this.onTextboxChangeName}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="warden">Warden</Label>
            <Input
              type="text"
              name="warden"
              placeholder="Enter Warden Name"
              value={warden}
              onChange={this.onTextboxChangewarden}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="subWarden">Sub Warden</Label>
            <Input
              type="text"
              name="subWarden"
              placeholder="Enter subWarden Name"
              value={subWarden}
              onChange={this.onTextboxChangeSubWarden}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="address">address</Label>
            <Input
              type="text"
              name="address"
              placeholder="Enter your address"
              value={address}
              onChange={this.onTextboxChangeaddress}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="contactNo">Contact No</Label>
            <Input
              type="contactNo"
              name="contactNo"
              placeholder="Enter Contact Number"
              value={contactNo}
              onChange={this.onTextboxChangeContactNo}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="location">location</Label>
            <Input
              type="location"
              name="location"
              placeholder="Enter location"
              value={location}
              onChange={this.onTextboxChangelocation}
            />
          </FormGroup>
          <button
            class="btn btn-primary"
            onClick={this.onSignUp}
            type="button"
            value="submit"
            color="primary"
          >
            Create Hostel
          </button>
        </div>
      </div>
    );
  }
}

export default createhostel;
