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

      touched: {
        firstName: false,
        lastName: false,
        email: false,
        role: false,
        workPlace: false,
      },
      img: { preview: "", raw: "" },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImgUploadChange = this.handleImgUploadChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    axios.get(`/user/${this.props.match.params.id}`).then((data) => {
      const { firstName, fullName, email, role, workPlace } = data.data.user;
      console.log(data);
      this.setState({
        firstName,
        fullName,
        email,
        role,
        workPlace,
      });
    });
  }

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
    const { touched, ...values } = this.state;
    axios
      .put(`/user/${this.props.match.params.id}`, {
        _id: this.props.match.params.id,
        ...values,
      })
      .then(() => alert("successfully updated"))

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
            <Form onSubmit={this.handleSubmit}>
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
                  </Col>

                  <Col md={3}>
                    {this.state.img.preview ? (
                      <img
                        src={this.state.img.preview}
                        alt="dummy"
                        width="200"
                        height="180"
                      />
                    ) : (
                      <>
                        {/* <span className="fa-stack fa-2x mt-3 mb-2">
                            <i className="fas fa-circle fa-stack-2x" />
                            <i className="fas fa-store fa-stack-1x fa-inverse" />
                          </span>
                          <h5 className="text-center">Upload your photo</h5> */}
                        <Card>
                          <CardImg
                            top
                            width="120"
                            height="180"
                            src="https://orthosera.com/wp-content/uploads/2016/02/user-profile-placeholder.png"
                            alt="Card image cap"
                          />
                        </Card>
                      </>
                    )}
                    <label htmlFor="upload-button" className="btn btn-warning">
                      Upload
                    </label>
                    <input
                      type="file"
                      id="upload-button"
                      style={{ display: "none" }}
                      onChange={this.handleImgUploadChange}
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
