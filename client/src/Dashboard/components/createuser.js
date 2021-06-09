import axios from "axios";
import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

export default class signUp extends React.Component {
  state = {
    firstName: "",
    fullName: "",
    email: "",
    role: "",
    workPlace: "",
    Password: "",
  };

  handleChange = (event) => {
    this.setState({
      firstName: event.target.value,
      fullName: event.target.value,
      email: event.target.value,
      role: event.target.value,
      workPlace: event.target.value,
      Password: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      firstName: this.state.firstName,
      fullName: this.state.fullName,
      email: this.state.email,
      role: this.state.role,
      workPlace: this.state.workPlace,
      Password: this.state.password,
    };

    axios.post("/user/signUp/", { user }).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };

  render() {
    return (
      <div>
        <div className="col-8 ">
          <div className="row">
            <div className="col-12 ">
              <p>
                Create User
                <br />
                Enter your credentials.
              </p>
            </div>
          </div>
          <FormGroup>
            <Label htmlFor="firstName">FisrtName</Label>
            <Input
              type="text"
              name="firstName"
              placeholder="Enter your FirstName"
              value={this.firstName}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              type="text"
              name="fullName"
              placeholder="Enter your Full Name"
              value={this.fullName}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={this.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="role">Role</Label>
            <Input
              type="select"
              name="role"
              placeholder="Enter your Role"
              onChange={this.handleChange}
              value={this.role}
              //   onBlur={this.handleBlur("role")}
            >
              <option value="admin">Admin</option>
              <option value="dean">Dean</option>
              <option value="warden">Warden</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="workPlace">Work Place</Label>
            <Input
              type="select"
              name="workPlace"
              placeholder="Enter your Working Place"
              onChange={this.handleChange}
              value={this.workPlace}
              //onBlur={this.handleBlur("workPlace")}
            >
              <option value="welfare">Welfare</option>
              <option value="science">Science</option>
              <option value="arts">Arts</option>
              <option value="kondavil">Kondavil</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.password}
              onChange={this.handleChange}
            />
          </FormGroup>
          <button
            class="btn btn-primary"
            onClick={this.handleSubmit}
            type="button"
            value="submit"
            color="primary"
          >
            Create User
          </button>
        </div>
      </div>
    );
  }
}
