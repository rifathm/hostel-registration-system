import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Card,
  CardImg,
} from "reactstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      workPlace: "",
      password: "",

      touched: {
        firstName: false,
        lastName: false,
        email: false,
        role: false,
        workPlace: false,
        password: false,
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.changeOnClick = this.changeOnClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImgUploadChange = this.handleImgUploadChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    axios.get(`/user/${this.props.match.params.id}`).then((data) => {
      const { firstName, fullName, email, role, workPlace, password } =
        data.data.user;
      console.log(data);
      this.setState({
        firstName,
        fullName,
        email,
        role,
        workPlace,
        password,
      });
    });
  }

  // changeOnClick = (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();

  //   formData.append("firstName", firstName);
  //   formData.append("fullName", fullName);
  //   formData.append("email", email);
  //   formData.append("workPlace", workPlace);
  //   formData.append("profile", fileName);

  //   firstName("");
  //   fullName("");
  //   email("");
  //   workPlace("");
  //   profile("");
  // };

  handleImgUploadChange(e) {
    if (e.target.files.length) {
      this.setState({
        img: {
          preview: URL.createObjectURL(e.target.files[0]),
          raw: e.target.files[0],
        },
      });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append("firstName", this.firstName);
    formData.append("fullName", this.fullName);
    formData.append("email", this.email);
    formData.append("workPlace", this.workPlace);
    formData.append("profile", this.fileName);

    this.firstName("");
    this.fullName("");
    this.email("");
    this.workPlace("");
    this.profile("");

    const { touched, ...values } = this.state;
    axios
      .put(`/user/${this.props.match.params.id}`, {
        _id: this.props.match.params.id,
        ...values,
      })
      .then(() => alert("successfully updated"))
      .then((res) => {
        window.location = `/dashboard/user`;
      })
      .catch((err) => alert(err));

    console.log(this.state);
    // alert("Current State is: " + JSON.stringify(this.state));
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-8">
            <h4>EDIT YOUR PROFILE</h4>
          </div>
        </div>

        <div className="col-12 col-sm-8"></div>

        <div className="row row-content">
          <div className="col-12">
            <Form onSubmit={this.handleSubmit} encType="multipart/form-data">
              <div className="col-12">
                <FormGroup row>
                  <Col md={8}>
                    <Label htmlFor="firstName">
                      <strong>FIRST NAME</strong>
                    </Label>
                    <Input
                      type="text"
                      name="firstName"
                      value={this.state.firstName}
                      onBlur={this.handleBlur("firstName")}
                      onChange={this.handleInputChange}
                    />

                    <Label htmlFor="fullName">
                      <strong>FULL NAME</strong>
                    </Label>
                    <Input
                      type="text"
                      name="fullName"
                      value={this.state.fullName}
                      onBlur={this.handleBlur("fullName")}
                      onChange={this.handleInputChange}
                    />

                    <Label htmlFor="email">
                      <strong>EMAIL</strong>
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      value={this.state.email}
                      onBlur={this.handleBlur("email")}
                      onChange={this.handleInputChange}
                    />

                    <Label htmlFor="role">
                      <strong>ROLE</strong>
                    </Label>
                    <Input
                      type="text"
                      name="role"
                      value={this.state.role}
                      onBlur={this.handleBlur("role")}
                      onChange={this.handleInputChange}
                    />
                    <Label htmlFor="workPlace">
                      <strong>WORK-PLACE</strong>
                    </Label>
                    <Input
                      type="text"
                      name="workPlace"
                      value={this.state.workPlace}
                      onBlur={this.handleBlur("workPlace")}
                      onChange={this.handleInputChange}
                    />

                    <Label htmlFor="password">
                      <strong>password</strong>
                    </Label>
                    <Input
                      type="password"
                      name="password"
                      value={this.state.password}
                      onBlur={this.handleBlur("password")}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md={{ size: 2, offset: 10 }}>
                    <Button
                      type="submit"
                      color="primary"
                      onClick={this.handleSubmit}
                    >
                      UPDATE
                    </Button>
                  </Col>
                </FormGroup>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EditUser);
