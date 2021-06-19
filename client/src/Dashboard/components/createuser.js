import React, { Component } from "react";
import "whatwg-fetch";
import { FormGroup, Input, Label } from "reactstrap";
import { withRouter } from "react-router-dom";
// import { getFromStorage, setInStorage } from "../utils/storage";
import { faculties, hostels } from "../../utils/data";

const workplaces = {
  admin: ["welfare"],
  dean: faculties,
  warden: hostels,
};

class SignUpCom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      token: "",
      signUpError: "",
      signUpFirstName: "",
      signUpEmail: "",
      signUpFullName: "",
      signUpPassword: "",
      Role: "admin",
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

    this.onTextboxChangeSignUpEmail =
      this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword =
      this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpFirstName =
      this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpFullName =
      this.onTextboxChangeSignUpFullName.bind(this);
    this.onTextboxChangeRole = this.onTextboxChangeRole.bind(this);

    this.onSignUp = this.onSignUp.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  // componentDidMount() {
  //   const obj = getFromStorage("the_main_app");

  //   if (obj && obj.token) {
  //     const { token } = obj;
  //     //verify token
  //     fetch("/verify?token=" + token)
  //       .then((res) => res.json())
  //       .then((json) => {
  //         if (json.success) {
  //           this.setState({
  //             token,
  //             isLoading: "false",
  //           });
  //         } else {
  //           this.setState({
  //             isLoading: false,
  //           });
  //         }
  //       });
  //   } else {
  //     this.setState({
  //       isLoading: false,
  //     });
  //   }
  // }

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

  onTextboxChangeSignUpFullName(event) {
    this.setState({
      signUpFullName: event.target.value,
    });
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onTextboxChangeRole(event) {
    this.setState({
      Role: event.target.value,
    });
  }

  onSignUp() {
    //grab State
    const {
      signUpFirstName,
      signUpFullName,
      signUpEmail,
      signUpPassword,
      Role,
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
        fullName: signUpFullName,
        email: signUpEmail,
        password: signUpPassword,
        role: Role,
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
            signUpFullName: "",
            Role: "admin",
            workPlace: "welfare",
          });

          this.props.history.push("/dashboard");
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
      signUpFullName,
      signUpPassword,
      signUpError,
      Role,
      workPlace,
    } = this.state;

    if (isLoading) {
      return <div>Succesfully Signed-Up </div>;
    }

    return (
      <div>
        <div>
          {signUpError ? <p>{signUpError}</p> : null}
          <div className="row">
            <div className="col-12 ">
              <p>
                SIGNUP
                <br />
                Enter your credentials.
              </p>
            </div>
          </div>
          <FormGroup>
            <Label htmlFor="firstName">FisrtName</Label>
            <Input
              type="text"
              name="FirstName"
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
              placeholder="Enter your fullName"
              value={signUpFullName}
              onChange={this.onTextboxChangeSignUpFullName}
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
              value={Role}
              onChange={this.onTextboxChangeRole}
            >
              <option value="admin">admin</option>
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
            >
              {workplaces[Role].map((workplace, idx) => (
                <option value={workplace} key={idx}>
                  {workplace}
                </option>
              ))}
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
          >
            SignUp
          </button>
          <br />
          <button
            type="button"
            class="btn btn-link"
            onClick={this.props.onAuthViewChange}
          >
            Already have an Account? SignIn
          </button>
          <br /> <br />
        </div>
      </div>
    );
  }
}

export default withRouter(SignUpCom);
