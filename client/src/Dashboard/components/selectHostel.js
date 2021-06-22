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
import { hostels } from "../../utils/data";

class SelectHostel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      regNo: "",
      faculty: "",
      course: "",
      selectedHostel: "",
      email: "",

      touched: {
        fullName: false,
        regNo: false,
        faculty: false,
        course: false,
        selectedHostel: false,
        email: false,
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    axios.get(`/students/${this.props.match.params.id}`).then(({ data }) => {
      const { fullName, regNo, faculty, course, selectedHostel, email } =
        data.student;
      this.setState({
        fullName,
        regNo,
        faculty,
        course,
        email,
        selectedHostel,
      });
    });
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
    const { selectedHostel } = this.state;
    const data = { isVerified: true, selectedHostel };
    axios
      .patch(`/students/${this.props.match.params.id}`, data)

      .then(() => alert("Hostel Selected"))
      .then((res) => {
        window.location = `/dashboard/Applications`;
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
            <h4>Hostel Selection</h4>
          </div>
        </div>

        <div className="col-12 col-sm-8"></div>

        <div className="row row-content">
          <div className="col-12">
            <Form onSubmit={this.handleSubmit}>
              <div className="col-12">
                <FormGroup row>
                  <Col md={8}>
                    <Label htmlFor="fullName">
                      <strong>FULL NAME</strong>
                    </Label>
                    <Input
                      type="text"
                      name="fullName"
                      value={this.state.fullName}
                      onBlur={this.handleBlur("fullName")}
                    />

                    <Label htmlFor="regNo">
                      <strong>REGISTRATION NO</strong>
                    </Label>
                    <Input
                      type="text"
                      name="regNo"
                      value={this.state.regNo}
                      onBlur={this.handleBlur("regNo")}
                    />

                    <Label htmlFor="faculty">
                      <strong>FACULTY</strong>
                    </Label>
                    <Input
                      type="faculty"
                      name="faculty"
                      value={this.state.faculty}
                      onBlur={this.handleBlur("faculty")}
                    />

                    <Label htmlFor="course">
                      <strong>COURSE OF STUDY</strong>
                    </Label>
                    <Input
                      type="text"
                      name="course"
                      value={this.state.course}
                      onBlur={this.handleBlur("course")}
                    />

                    <Label htmlFor="email">
                      <strong>EMAIL</strong>
                    </Label>
                    <Input
                      type="text"
                      name="email"
                      value={this.state.email}
                      onBlur={this.handleBlur("email")}
                    />
                    <Label htmlFor="selectedHostel">
                      <strong>SELECT A HOSTEL</strong>
                    </Label>
                    <Input
                      type="select"
                      name="selectedHostel"
                      value={this.state.selectedHostel}
                      onBlur={this.handleBlur("selectedHostel")}
                      onChange={this.handleInputChange}
                    >
                      {hostels.map((opt, id) => (
                        <option value={opt} key={id}>
                          {opt}
                        </option>
                      ))}
                    </Input>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md={6}>
                    <Button
                      type="submit"
                      href={`/view-student/${this.props.match.params.id}`}
                      //  href={`/create-pdf/${this.props.match.params.id}`}
                      color="primary"
                    >
                      VIEW FULL DETAILS
                    </Button>
                  </Col>
                  <Col md={6}>
                    <Button
                      type="submit"
                      color="primary"
                      onClick={this.handleSubmit}
                    >
                      SEND
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

export default withRouter(SelectHostel);
