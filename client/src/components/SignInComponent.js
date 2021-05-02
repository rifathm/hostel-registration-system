import React, { Component } from "react";
import "whatwg-fetch";
import { FormGroup, Input, Label } from "reactstrap";
import { getFromStorage, setInStorage } from "../utils/storage";
import { withRouter } from "react-router-dom";

class SignInCom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      token: "",
      signInError: "",
      signInEmail: "",
      signInPassword: "",
    };
    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(
      this
    );
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(
      this
    );

    this.onSignIn = this.onSignIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage("the_main_app");

    if (obj && obj.token) {
      const { token } = obj;
      //verify token
      fetch("/verify?token=" + token)
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            this.setState({
              token,
              isLoading: "false",
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onSignIn() {
    //grab State
    const { signInEmail, signInPassword } = this.state;

    this.setState({
      isLoading: true,
    });

    // POST request to backend
    fetch("http://localhost:5000/user/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          // console.log(json);
          setInStorage("the_main_app", { token: json.token });
          setInStorage("the_main_app_role", { role: json.role });
          setInStorage("the_main_app_workPlace", { workPlace: json.workPlace });

          this.setState({
            signInError: json.message,
            isLoading: false,
            signInEmail: "",
            signinPassword: "",
            token: json.token,
          });
          this.props.history.push("/dashboard");
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
  }

  logOut() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage("the_main_app");

    if (obj && obj.token) {
      const { token } = obj;
      //verify token
      fetch("/user/logOut?token=" + token)
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            this.setState({
              token: "",
              isLoading: false,
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: true,
      });
    }
  }

  render() {
    const {
      isLoading,
      //token,
      signInError,
      signInEmail,
      signInPassword,
    } = this.state;

    if (isLoading) {
      return (
        <div>
          <p>Loading....</p>
        </div>
      );
    }

    return (
      <div>
        <div>
          {signInError ? <p>{signInError}</p> : null}

          <div className="row">
            <div className="col-12 ">
              <p>
                LOGIN
                <br />
                Enter your credentials.
              </p>
            </div>
          </div>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={signInEmail}
              onChange={this.onTextboxChangeSignInEmail}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              value={signInPassword}
              onChange={this.onTextboxChangeSignInPassword}
            />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="remember"
                innerRef={(input) => (this.remember = input)}
              />
              Remember me
            </Label>
          </FormGroup>

          <button
            type="button"
            class="btn btn-primary"
            value="submit"
            onClick={this.onSignIn}
            color="primary"
          >
            Login
          </button>

          <br />
          <button
            type="button"
            class="btn btn-link"
            onClick={this.props.onAuthViewChange}
          >
            Don't have an Account? Create Account
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(SignInCom);
