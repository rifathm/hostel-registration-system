import React, { Component } from "react";
import SignInCom from "./SignInComponent";

import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  Jumbotron,
  Button,
  Modal,
  ModalHeader,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import SignUpCom from "./SignUpComponent";

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleAuthView = this.handleAuthView.bind(this);

    this.state = {
      isNavOpen: false,
      isModalOpen: false,
      authView: "signIn",
    };
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleAuthView() {
    this.setState({
      authView: this.state.authView === "signIn" ? "signUp" : "signIn",
    });
  }

  handleLogin(event) {
    this.toggleModal();
    alert(
      "Username: " +
        this.username.value +
        " Password: " +
        this.password.value +
        " Remember: " +
        this.remember.checked
    );
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Navbar dark expand="md">
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand className="mr-auto" href="/">
              <img
                src="assets/images/LOGOUOJ.png"
                className="img-fluid rounded-circle"
                height="30"
                width="41"
                alt="LOGOUOJ"
              />
            </NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  {" "}
                  <NavLink className="nav-link" to="/">
                    <span className="fa fa-home fa-lg"></span> Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/aboutus">
                    <span className="fa fa-info fa-lg"></span> About Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/registration">
                    <span className="fa fa-registered  fa-lg"></span>
                    Registration
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/guide">
                    <span className="fa fa-exclamation-circle  fa-lg"></span>
                    Guidelines
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/contact">
                    <span className="fa fa-address-card fa-lg"></span> Contact
                    Us
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-sign-in fa-lg"></span> AdminLogin
                  </Button>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        <Jumbotron>
          <div className="container">
            <div className="row row-header">
              <div className="col-12 col-sm-3   align-self-center">
                <img
                  src="assets/images/UOJLOGO2.jpg"
                  className="img-fluid rounded-circle"
                  alt="LOGOUOJ"
                />
              </div>
              <div className="col-12 col-sm-6">
                <h1>UNIVERSITY OF JAFFNA</h1>
                <p>-STUDENT WELFARE DIVISION</p>
              </div>
            </div>
          </div>
        </Jumbotron>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            <div className="row">
              <div className="col-12 col-sm-2">
                <img
                  src="assets/images/LOGOUOJ.png"
                  className="img-fluid rounded-circle"
                  height="50"
                  width="50"
                  alt="LOGOUOJ"
                />
              </div>
              <div className="col-12 col-sm-10">
                <h4>Hostel Registration System</h4>
                <p>University of Jaffna</p>
              </div>
            </div>

            <form>
              {this.state.authView === "signIn" ? (
                <SignInCom onAuthViewChange={this.handleAuthView} />
              ) : (
                <SignUpCom onAuthViewChange={this.handleAuthView} />
              )}
            </form>
          </ModalHeader>
        </Modal>
      </div>
    );
  }
}

export default Header;
