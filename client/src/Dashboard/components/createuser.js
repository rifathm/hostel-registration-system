import React, { Component } from "react";
import "whatwg-fetch";
import { FormGroup, Input, Label } from "reactstrap";

class SignUpCom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      token: "",
      signUpError: "",
      signUpFirstName: "",
      signUpEmail: "",
      signUpfullName: "",
      signUpPassword: "",
      role: "admin",
      workPlace: "welfare",
      touched: {
        token: false,
        signUpError: false,
        signUpFirstName: false,
        signUpEmail: false,
        signUpfullName: false,
        signUpPassword: false,
        role: false,
        workPlace: false,
      },
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(
      this
    );
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(
      this
    );
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(
      this
    );
    this.onTextboxChangeSignUpfullName = this.onTextboxChangeSignUpfullName.bind(
      this
    );

    this.onSignUp = this.onSignUp.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpFirstName(event) {
    this.setState({
      signUpFirstName: event.target.value,
    });
  }

  onTextboxChangeSignUpfullName(event) {
    this.setState({
      signUpfullName: event.target.value,
    });
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  onSignUp() {
    //grab State
    const {
      signUpFirstName,
      signUpfullName,
      signUpEmail,
      signUpPassword,
      role,
      workPlace,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // POST request to backend
    fetch("/user/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: signUpFirstName,
        fullName: signUpfullName,
        email: signUpEmail,
        password: signUpPassword,
        role: role,
        workPlace: workPlace,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          this.setState({
            signupError: json.message,
            isLoading: false,
            signUpEmail: "",
            signUpPassword: "",
            signUpFirstName: "",
            signUpfullName: "",
            role: "",
            workPlace: "",
          });
        } else {
          this.setState({
            signupError: json.message,
            isLoading: false,
          });
        }
      });
  }

  render() {
    const {
      isLoading,
      //token,
      signUpFirstName,
      signUpEmail,
      signUpfullName,
      signUpPassword,
      signUpError,
      role,
      workPlace,
    } = this.state;

    if (isLoading) {
      return <div>Succesfully Signed-Up </div>;
    }

    return (
      <div>
        <div className="col-8 ">
          {signUpError ? <p>{signUpError}</p> : null}
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
              value={signUpFirstName}
              onChange={this.onTextboxChangeSignUpFirstName}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              type="text"
              name="fullName"
              placeholder="Enter your Full Name"
              value={signUpfullName}
              onChange={this.onTextboxChangeSignUpfullName}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={signUpEmail}
              onChange={this.onTextboxChangeSignUpEmail}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="role">Role</Label>
            <Input
              type="select"
              name="role"
              placeholder="Enter your Role"
              onChange={this.handleInputChange}
              value={role}
              onBlur={this.handleBlur("role")}
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
              onChange={this.handleInputChange}
              value={workPlace}
              onBlur={this.handleBlur("workPlace")}
            >
              <option value="welfare">Welfare</option>
              <option value="science">Science</option>
              <option value="kondavil">Kondavil</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              value={signUpPassword}
              onChange={this.onTextboxChangeSignUpPassword}
            />
          </FormGroup>
          <button
            class="btn btn-primary"
            onClick={this.onSignUp}
            type="button"
            value="submit"
            color="primary"
            href="/dashboard"
          >
            Create User
          </button>
        </div>
      </div>
    );
  }
}

export default SignUpCom;
