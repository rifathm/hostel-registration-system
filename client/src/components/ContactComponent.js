import React, { Component } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import axios from "axios";
import Map from "./Map";

class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      telnum: "",
      email: "",
      agree: false,
      contactType: "Tel.",
      message: "",
      touched: {
        firstname: false,
        lastname: false,
        telnum: false,
        email: false,
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
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
      .post("http://localhost:5000/feedback/createFeedback", values)

      .then((res) => {
        window.location = `/`;
        console.log(res.data.data._id);
      })

      .catch((err) => alert(err));
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  validate(firstname, lastname, telnum, email) {
    const errors = {
      firstname: "",
      lastname: "",
      telnum: "",
      email: "",
    };

    if (this.state.touched.firstname && firstname.length < 3)
      errors.firstname = "First Name should be >= 3 characters";
    else if (this.state.touched.firstname && firstname.length > 10)
      errors.firstname = "First Name should be <= 10 characters";

    if (this.state.touched.lastname && lastname.length < 3)
      errors.lastname = "Last Name should be >= 3 characters";
    else if (this.state.touched.lastname && lastname.length > 10)
      errors.lastname = "Last Name should be <= 10 characters";

    const reg = /^\d+$/;
    if (this.state.touched.telnum && !reg.test(telnum))
      errors.telnum = "Tel. Number should contain only numbers";

    if (
      this.state.touched.email &&
      email.split("").filter((x) => x === "@").length !== 1
    )
      errors.email = "Email should contain a @";

    return errors;
  }

  render() {
    const errors = this.validate(
      this.state.firstname,
      this.state.lastname,
      this.state.telnum,
      this.state.email
    );
    return (
      <Layout>
        <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/home">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>Contact Us</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>Contact Us</h3>
              <hr />
            </div>
          </div>
          <div className="row row-content">
            <div className="col-12">
              <h3>Location Information</h3>
            </div>
            <div className="col-12 col-sm-4 offset-sm-1">
              <h5>Address</h5>
              <address>
                PO Box 57,
                <br />
                Thirunelvely, Jaffna
                <br />
                Sri Lanka <br />
                <i className="fa fa-phone"></i>: (+94) 021 221 8100
                <br />
                <i className="fa fa-envelope"></i>:{" "}
                <a href="mailto:xxxxxxxxx@univ.jfn.ac.lk">
                  info@univ.jfn.ac.lk
                </a>
              </address>
            </div>
            <div className="col-12 col-sm-6 offset-sm-1">
              <h5>Map of our Location-Student Welfare Division</h5>
              <Map
                location={
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3932.95530886328!2d80.01985261461274!3d9.684855593067683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afe5413b6aaaa91%3A0x434111cf1150e06b!2z4K6v4K6-4K604K-N4K6q4K-N4K6q4K6-4K6j4K6q4K-NIOCuquCusuCvjeCuleCusuCviOCuleCvjeCuleCutOCuleCuruCvjSAtIOC2uuC3j-C2tOC2seC2uiDgt4Dgt5Lgt4Hgt4rgt4Dgt4Dgt5Lgtq_gt4rigI3gtrrgt4_gtr3gtrogLSBVbml2ZXJzaXR5IG9mIEphZmZuYQ!5e0!3m2!1sen!2slk!4v1623502889486!5m2!1sen!2slk"
                    width="600"
                    height="450"
                    style="border:0;"
                    allowfullscreen=""
                    loading="lazy"
                  >
                    {" "}
                  </iframe>
                }
              />
            </div>
            <div className="col-12 col-sm-11 offset-sm-1">
              <div className="btn-group" role="group">
                <a
                  role="button"
                  className="btn btn-primary"
                  href="tel:+85212345678"
                >
                  <i className="fa fa-phone"></i> Call
                </a>
                <a role="button" className="btn btn-info">
                  <i className="fa fa-skype"></i> Skype
                </a>
                <a
                  role="button"
                  className="btn btn-success"
                  href="mailto:confusion@food.net"
                >
                  <i className="fa fa-envelope-o"></i> Email
                </a>
              </div>
            </div>
          </div>

          <div className="row row-content">
            <div className="col-12">
              <h2>Inquiry Form</h2>
              <h5>We will get in touch with you shortly</h5>
            </div>
            <div className="col-12 col-md-9">
              <Form onSubmit={this.handleSubmit}>
                <FormGroup row>
                  <Label htmlFor="firstname" md={2}>
                    First Name
                  </Label>
                  <Col md={10}>
                    <Input
                      type="text"
                      id="firstname"
                      name="firstname"
                      placeholder="First Name"
                      value={this.state.firstname}
                      valid={errors.firstname === ""}
                      invalid={errors.firstname !== ""}
                      onBlur={this.handleBlur("firstname")}
                      onChange={this.handleInputChange}
                    />
                    <FormFeedback>{errors.firstname}</FormFeedback>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label htmlFor="lastname" md={2}>
                    Last Name
                  </Label>
                  <Col md={10}>
                    <Input
                      type="text"
                      id="lastname"
                      name="lastname"
                      placeholder="Last Name"
                      value={this.state.lastname}
                      valid={errors.lastname === ""}
                      invalid={errors.lastname !== ""}
                      onBlur={this.handleBlur("lastname")}
                      onChange={this.handleInputChange}
                    />
                    <FormFeedback>{errors.lastname}</FormFeedback>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label htmlFor="telnum" md={2}>
                    Contact Tel.
                  </Label>
                  <Col md={10}>
                    <Input
                      type="tel"
                      id="telnum"
                      name="telnum"
                      placeholder="Tel. Number"
                      value={this.state.telnum}
                      valid={errors.telnum === ""}
                      invalid={errors.telnum !== ""}
                      onBlur={this.handleBlur("telnum")}
                      onChange={this.handleInputChange}
                    />
                    <FormFeedback>{errors.telnum}</FormFeedback>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label htmlFor="email" md={2}>
                    Email
                  </Label>
                  <Col md={10}>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      value={this.state.email}
                      valid={errors.email === ""}
                      invalid={errors.email !== ""}
                      onBlur={this.handleBlur("email")}
                      onChange={this.handleInputChange}
                    />
                    <FormFeedback>{errors.email}</FormFeedback>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md={{ size: 6, offset: 2 }}>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="checkbox"
                          name="agree"
                          checked={this.state.agree}
                          onChange={this.handleInputChange}
                        />{" "}
                        <strong>May we contact you?</strong>
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col md={{ size: 3, offset: 1 }}>
                    <Input
                      type="select"
                      name="contactType"
                      id="contactType"
                      value={this.state.contactType}
                      onChange={this.handleInputChange}
                    >
                      <option>Tel</option>
                      <option>Email</option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label htmlFor="message" md={2}>
                    Leave Your Message
                  </Label>
                  <Col md={10}>
                    <Input
                      type="textarea"
                      id="message"
                      name="message"
                      rows="12"
                      value={this.state.message}
                      onChange={this.handleInputChange}
                    ></Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md={{ size: 10, offset: 2 }}>
                    <Button type="submit" color="primary">
                      SUBMIT
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Contact;
