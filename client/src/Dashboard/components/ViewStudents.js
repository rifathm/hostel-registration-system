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

import axios from "axios";
import { withRouter } from "react-router-dom";

class viewStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      surName: "",
      dob: "",
      nic: "",
      contactNo: "",
      email: "",
      sex: "male",
      residentalAddress: "",
      medicalIssues: "",
      district: "",
      year: "1",
      GSdivision: "",
      DSdivision: "",
      course: "",
      regNo: "",
      faculty: "",
      name: "",
      relationship: "",
      residentalAddress2: "",
      phoneNo: "",
      policeStation: "",
      agree: false,
      preference: "",
      touched: {
        fullName: false,
        surName: false,
        dob: false,
        nic: false,
        contactNo: false,
        email: false,
        year: false,
        residentalAddress: false,
        medicalIssues: false,
        district: false,
        GSdivision: false,
        DSdivision: false,
        regNo: false,
        name: false,
        relationship: false,
        residentalAddress2: false,
        phoneNo: false,
        policeStation: false,
      },
      img: { preview: "", raw: "" },
    };
  }

  componentDidMount() {
    console.log(this.props.match.params);
    axios.get(`/students/${this.props.match.params.id}`).then(({ data }) => {
      const {
        fullName,
        surName,
        residentalAddress,
        nic,
        district,
        regNo,
        email,
        dob,
        sex,
        contactNo,
        GSdivision,
        DSdivision,
        faculty,
        course,
        preference,
        year,
        medicalIssues,
        name,
        relationship,
        residentalAddress2,
        phoneNo,
        policeStation,
      } = data.student;
      this.setState({
        fullName,
        surName,
        residentalAddress,
        nic,
        district,
        regNo,
        email,
        dob,
        sex,
        contactNo,
        GSdivision,
        DSdivision,
        faculty,
        course,
        preference,
        year,
        medicalIssues,
        name,
        relationship,
        residentalAddress2,
        phoneNo,
        policeStation,
      });
    });
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  render() {
    return (
      <div className="container">
        <div className="col-12 col-sm-8"></div>

        <div className="row row-content">
          <div className="col-12">
            <Form>
              <div className="col-12">
                <p>
                  <strong>STUDENT DETAILS </strong>
                </p>

                <FormGroup row>
                  <Col md={8}>
                    <Label htmlFor="fullName">
                      <strong>FULL NAME</strong>
                    </Label>
                    <Input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={this.state.fullName}
                    />

                    <Label htmlFor="surName">
                      <strong>SUR NAME</strong>
                    </Label>
                    <Input
                      type="text"
                      id="surName"
                      name="surName"
                      value={this.state.surName}
                    />

                    <Label htmlFor="residentalAddress">
                      <strong>RESIDENTIAL ADDRESS</strong>
                    </Label>
                    <Input
                      type="text"
                      id="residentalAddress"
                      name="residentalAddress"
                      value={this.state.residentalAddress}
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
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md={4}>
                    <Label htmlFor="district">
                      <strong>DISTRICT</strong>
                    </Label>
                    <Input
                      type="text"
                      id="district"
                      name="district"
                      value={this.state.district}
                    />
                  </Col>

                  <Col md={4}>
                    <Label htmlFor="GSdivision">
                      <strong>GS DIVISION</strong>
                    </Label>
                    <Input
                      type="text"
                      id="GSdivision"
                      name="GSdivision"
                      value={this.state.GSdivision}
                    />
                  </Col>
                  <Col md={4}>
                    <Label htmlFor="DSdivision">
                      <strong>DS DIVISION</strong>
                    </Label>

                    <Input
                      type="text"
                      id="DSdivision"
                      name="DSdivision"
                      value={this.state.DSdivision}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md={4}>
                    <Label htmlFor="sex">
                      <strong>SEX</strong>
                    </Label>
                    <Input
                      type="text"
                      id="sex"
                      name="sex"
                      value={this.state.sex}
                    />
                  </Col>
                  <Col md={4}>
                    <Label htmlFor="dob">
                      <strong>DATE OF BIRTH</strong>
                    </Label>
                    <Input id="dob" name="dob" value={this.state.dob} />
                  </Col>
                  <Col md={4}>
                    <Label htmlFor="nic">
                      <strong>NIC</strong>
                    </Label>
                    <Input
                      type="text"
                      id="nic"
                      name="nic"
                      value={this.state.nic}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md={8}>
                    <Label htmlFor="regNo">
                      <strong>UNIVERSITY REGISTRATION NUMBER</strong>
                    </Label>
                    <Input
                      type="text"
                      id="regNo"
                      name="regNo"
                      value={this.state.regNo}
                    />
                  </Col>
                  <Col md={4}>
                    <Label htmlFor="faculty">
                      <strong>FACULTY</strong>
                    </Label>
                    <Input
                      type="text"
                      name="faculty"
                      value={this.state.faculty}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md={4}>
                    <Label htmlFor="course">
                      <strong>COURSE OF STUDY</strong>
                    </Label>
                    <Input
                      type="text"
                      name="course"
                      value={this.state.course}
                    />
                  </Col>
                  <Col md={4}>
                    <Label htmlFor="year">
                      <strong>YEAR OF STUDY</strong>
                    </Label>
                    <Input type="text" name="year" value={this.state.year} />
                  </Col>
                  <Col md={4}>
                    <Label htmlFor="preference">
                      <strong>HOSTELPREFERENCE</strong>
                    </Label>
                    <Input
                      type="text"
                      name="preference"
                      value={this.state.preference}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md={4}>
                    <Label htmlFor="contactNo">
                      <strong>CONTACT NUMBER</strong>
                    </Label>
                    <Input
                      type="text"
                      id="contactNo"
                      name="contactNo"
                      value={this.state.contactNo}
                    />
                  </Col>

                  <Col md={8}>
                    <Label htmlFor="email">
                      <strong>EMAIL ID</strong>
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={this.state.email}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md={12}>
                    <Label htmlFor="medicalIssues">
                      <strong>
                        Whether the candidate has any medical History of
                        Alignments
                      </strong>
                      <br />
                      If yes , please state briefly & Attach Medical Certificate
                    </Label>
                    <Input
                      type="text"
                      id="medicalIssues"
                      name="medicalIssues"
                      value={this.state.medicalIssues}
                    />
                  </Col>
                </FormGroup>

                <p>
                  <strong>PERSON TO CONTACT IN CASE OF EMERGENCY</strong>
                </p>

                <FormGroup row>
                  <Col md={6}>
                    <Label htmlFor="name">
                      <strong>NAME</strong>
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={this.state.name}
                    />
                  </Col>
                  <Col md={6}>
                    <Label htmlFor="relationship">
                      <strong>RELATIONSHIP</strong>
                    </Label>
                    <Input
                      type="text"
                      name="relationship"
                      value={this.state.relationship}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md={6}>
                    <Label htmlFor="residentalAddress2">
                      <strong>RESIDENTIAL ADDRESS</strong>
                    </Label>
                    <Input
                      type="text"
                      id="residentalAddress2"
                      name="residentalAddress2"
                      value={this.state.residentalAddress2}
                    />
                  </Col>

                  <Col md={6}>
                    <Label htmlFor="phoneNo">
                      <strong>PHONE NO</strong>
                    </Label>
                    <Input
                      id="phoneNo"
                      name="phoneNo"
                      value={this.state.phoneNo}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md={12}>
                    <Label htmlFor="policeStation">
                      <strong>POLICE STATION NEAR BY YOUR HOMETOWN</strong>
                    </Label>
                    <Input
                      type="text"
                      id="policeStation"
                      name="policeStation"
                      value={this.state.policeStation}
                    />
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
export default withRouter(viewStudents);
