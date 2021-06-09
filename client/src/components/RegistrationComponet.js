import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  FormFeedback,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardImg,
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

import { districts, faculties, hostels } from "../utils/data";
// import { selectFields } from "express-validator/src/select-fields";

// const Demo = () => {
//   const [district, setDistrict] = useState(data[0].district)
//   const [division, setDivision] = useState(data.filter((obj) => obj.district === district)[0].division[0])
//   return (<div>
//     <select value={district} onChange={e => setDistrict(e.target.value)}>
//       {data.map((opt, idx) => <option key={idx}>{ opt.district }</option>)}
//     </select>
//     <select value={division} onChange={e => setDivision(e.target.value)}>
//       {data.filter(obj => obj.district === district)[0].division.map((opt, idx) => <option key={idx}>{ opt  }</option>)}
//     </select>
//   </div>)
// }

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      surName: "",
      dob: "",
      nic: "",
      contactNo: "",
      email: "",
      sex: "N/A",
      residentalAddress: "",
      medicalIssues: "",
      district: districts[0].district,
      year: "N/A",
      GSdivision: "",
      DSdivision: "N/A",
      course: "N/A",
      regNo: "",
      faculty: "N/A",
      name: "",
      relationship: "N/A",
      residentalAddress2: "",
      phoneNo: "",
      policeStation: "",
      agree: false,
      preference: "N/A",
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImgUploadChange = this.handleImgUploadChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleImgUploadChange(e) {
    if (e.target.files.length) {
      console.log(e.target.files[0]);
      this.setState({
        img: e.target.files[0],
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
      .post("/students", values)

      .then((res) => {
        window.location = `/ViewStudent/${res.data.data._id}`;
        console.log(res.data.data._id);
      })

      .catch((err) => alert(err));
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  validate(fullName, surName, nic, contactNo, phoneNo, email, regNo, name) {
    const errors = {
      fullName: "",
      surName: "",
      nic: "",
      contactNo: "",
      phoneNo: "",
      email: "",
      regNo: "",
      name: "",
    };

    if (this.state.touched.fullName && fullName.length < 3)
      errors.fullName = "Full Name should be >= 3 characters";

    if (this.state.touched.surName && surName.length < 3)
      errors.surName = "Sur Name should be >= 3 characters";
    else if (this.state.touched.surName && surName.length > 10)
      errors.surName = "Sur Name should be <= 20 characters";

    if (this.state.touched.nic && nic.length < 10)
      errors.nic = "NIC should be >= 10 characters";

    const reg = /^\d+$/;
    if (this.state.touched.contactNo && !reg.test(contactNo))
      errors.contactNo = "contactNo should contain only numbers";

    if (this.state.touched.phoneNo && !reg.test(phoneNo))
      errors.phoneNo = "phoneNo should contain only numbers";

    if (
      this.state.touched.email &&
      email.split("").filter((x) => x === "@").length !== 1
    )
      errors.email = "Email should contain a @";

    if (this.state.touched.name && name.length < 3)
      errors.name = "Name should be >= 3 characters";
    else if (this.state.touched.name && name.length > 10)
      errors.name = "Name should be <= 20 characters";
    return errors;
  }

  render() {
    const errors = this.validate(
      this.state.fullName,
      this.state.surName,
      this.state.nic,
      this.state.contactNo,
      this.state.phoneNO,
      this.state.email,
      this.state.regNo,
      this.state.name
    );
    return (
      <div className="container">
        <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>Registration</BreadcrumbItem>
            </Breadcrumb>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12 col-sm-1">
            <img
              src="assets/images/LOGOUOJ.png"
              className="img-fluid rounded-circle"
              height="50"
              width="50"
              alt="LOGOUOJ"
            />
          </div>
          <div className="col-12 col-sm-8">
            <h4>Hostel Registration System</h4>
            <p>University of Jaffna</p>
          </div>
        </div>

        <div className="col-12 col-sm-8"></div>

        <div className="row row-content">
          <div className="col-12">
            <Form onSubmit={this.handleSubmit} enctype="multipart/form-data">
              <div className="col-12">
                <p>
                  <strong>HOSTEL REGISTRATION FORM .</strong>Student Particulars
                </p>
                <p>
                  <strong>1.Please fill in BLOCK LETTERS</strong>
                  <br />
                  <strong>2.Upload a colour photograph</strong>
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
                      placeholder="FULL NAME"
                      value={this.state.fullName}
                      valid={errors.fullName === ""}
                      invalid={errors.fullName !== ""}
                      onBlur={this.handleBlur("fullName")}
                      onChange={this.handleInputChange}
                    />
                    <FormFeedback>{errors.fullName}</FormFeedback>

                    <Label htmlFor="surName">
                      <strong>SUR NAME</strong>
                    </Label>
                    <Input
                      type="text"
                      id="surName"
                      name="surName"
                      placeholder="SUR NAME"
                      value={this.state.surName}
                      valid={errors.surName === ""}
                      invalid={errors.surName !== ""}
                      onBlur={this.handleBlur("surName")}
                      onChange={this.handleInputChange}
                    />
                    <FormFeedback>{errors.surName}</FormFeedback>

                    <Label htmlFor="residentalAddress">
                      <strong>RESIDENTIAL ADDRESS</strong>
                    </Label>
                    <Input
                      type="text"
                      id="residentalAddress"
                      name="residentalAddress"
                      placeholder="RESIDENTIAL ADDRESS"
                      value={this.state.residentalAddress}
                      onBlur={this.handleBlur("residentalAddress")}
                      onChange={this.handleInputChange}
                    />
                  </Col>

                  <Col md={3}>
                    {this.state.img.preview ? (
                      <img alt="dummy" width="200" height="180" />
                    ) : (
                      <Card>
                        <CardImg
                          top
                          width="120"
                          height="180"
                          src="https://orthosera.com/wp-content/uploads/2016/02/user-profile-placeholder.png"
                          alt="Card image cap"
                        />
                      </Card>
                    )}

                    <label htmlFor="upload-button" className="btn btn-warning">
                      Upload
                    </label>
                    <input
                      type="file"
                      name="img"
                      id="upload-button"
                      style={{ display: "none" }}
                      onChange={this.handleImgUploadChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md={4}>
                    <Label htmlFor="district">
                      <strong>DISTRICT</strong>
                    </Label>
                    <Input
                      type="select"
                      id="district"
                      name="district"
                      value={this.state.district}
                      onChange={this.handleInputChange}
                    >
                      {districts.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Input>
                  </Col>

                  <Col md={4}>
                    <Label htmlFor="DSdivision">
                      <strong>DS DIVISION</strong>
                    </Label>

                    <Input
                      type="select"
                      id="DSdivision"
                      name="DSdivision"
                      onChange={this.handleInputChange}
                      value={this.state.DSdivision}
                    >
                      {districts.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Input>
                  </Col>

                  <Col md={4}>
                    <Label htmlFor="GSdivision">
                      <strong>GS DIVISION</strong>
                    </Label>
                    <Input
                      type="text"
                      id="GSdivision"
                      name="GSdivision"
                      placeholder="GS DIVISION"
                      value={this.state.GSdivision}
                      onBlur={this.handleBlur("GSdivision")}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md={4}>
                    <Label htmlFor="sex">
                      <strong>SEX</strong>
                    </Label>
                    <Input
                      type="select"
                      id="sex"
                      name="sex"
                      value={this.state.sex}
                      onChange={this.handleInputChange}
                    >
                      <option selected>MALE</option>
                      <option>FEMALE</option>
                    </Input>
                  </Col>
                  <Col md={4}>
                    <Label htmlFor="dob">
                      <strong>DATE OF BIRTH</strong>
                    </Label>
                    <Input
                      type="date"
                      id="dob"
                      name="dob"
                      placeholder="DATE OF BIRTH"
                      value={this.state.dob}
                      onBlur={this.handleBlur("dob")}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Col md={4}>
                    <Label htmlFor="nic">
                      <strong>NIC</strong>
                    </Label>
                    <Input
                      type="text"
                      id="nic"
                      name="nic"
                      placeholder="NIC"
                      value={this.state.nic}
                      valid={errors.nic === ""}
                      invalid={errors.nic !== ""}
                      onBlur={this.handleBlur("nic")}
                      onChange={this.handleInputChange}
                    />
                    <FormFeedback>{errors.nic}</FormFeedback>
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
                      placeholder="UNIVERSITY REGISTRATION NUMBER"
                      value={this.state.regNo}
                      valid={errors.regNo === ""}
                      invalid={errors.regNo !== ""}
                      onBlur={this.handleBlur("regNo")}
                      onChange={this.handleInputChange}
                    />
                    <FormFeedback>{errors.nic}</FormFeedback>
                  </Col>
                  <Col md={4}>
                    <Label htmlFor="faculty">
                      <strong>FACULTY</strong>
                    </Label>
                    <Input
                      type="select"
                      name="faculty"
                      value={this.state.faculty}
                      onChange={this.handleInputChange}
                    >
                      {faculties.map((opt, id) => (
                        <option value={opt} key={id}>
                          {opt}
                        </option>
                      ))}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md={4}>
                    <Label htmlFor="course">
                      <strong>COURSE OF STUDY</strong>
                    </Label>
                    <Input
                      type="select"
                      name="course"
                      value={this.state.course}
                      onChange={this.handleInputChange}
                    >
                      <option selected>COMPUTER SCIENCE</option>
                      <option>PHYSICAL SCIENCE</option>
                      <option>BIO SCIENCE</option>
                      <option>COMMERCE</option>
                      <option>LAW</option>
                      <option>ARTS & LITERATURE</option>
                    </Input>
                  </Col>
                  <Col md={4}>
                    <Label htmlFor="year">
                      <strong>YEAR OF STUDY</strong>
                    </Label>
                    <Input
                      type="select"
                      name="year"
                      value={this.state.year}
                      onChange={this.handleInputChange}
                    >
                      <option value="1">1ST YEAR</option>
                      <option value="2">4TH YEAR</option>
                    </Input>
                  </Col>
                  <Col md={4}>
                    <Label htmlFor="preference">
                      <strong>HOSTELPREFERENCE</strong>
                    </Label>
                    <Input
                      type="select"
                      name="preference"
                      value={this.state.preference}
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
                  <Col md={4}>
                    <Label htmlFor="contactNo">
                      <strong>CONTACT NUMBER</strong>
                    </Label>
                    <Input
                      type="tel"
                      id="contactNo"
                      name="contactNo"
                      placeholder="CONTACT NUMBER"
                      value={this.state.contactNo}
                      valid={errors.contactNo === ""}
                      invalid={errors.contactNo !== ""}
                      onBlur={this.handleBlur("contactNo")}
                      onChange={this.handleInputChange}
                    />
                    <FormFeedback>{errors.contactNo}</FormFeedback>
                  </Col>

                  <Col md={8}>
                    <Label htmlFor="email">
                      <strong>EMAIL ID</strong>
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="EMAIL ID"
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
                      placeholder="MEDICAL ISSUES"
                      value={this.state.medicalIssues}
                      onBlur={this.handleBlur("medicalIssues")}
                      onChange={this.handleInputChange}
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
                      placeholder="NAME"
                      value={this.state.name}
                      valid={errors.name === ""}
                      invalid={errors.name !== ""}
                      onBlur={this.handleBlur("name")}
                      onChange={this.handleInputChange}
                    />
                    <FormFeedback>{errors.name}</FormFeedback>
                  </Col>
                  <Col md={6}>
                    <Label htmlFor="relationship">
                      <strong>RELATIONSHIP</strong>
                    </Label>
                    <Input
                      type="select"
                      name="relationship"
                      value={this.state.relationship}
                      onChange={this.handleInputChange}
                    >
                      <option selected>FATHER</option>
                      <option>MOTHER</option>
                      <option>GUARDIAN</option>
                    </Input>
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
                      placeholder="RESIDENTIAL ADDRESS"
                      value={this.state.residentalAddress2}
                      onBlur={this.handleBlur("residentalAddress2")}
                      onChange={this.handleInputChange}
                    />
                  </Col>

                  <Col md={6}>
                    <Label htmlFor="phoneNo">
                      <strong>PHONE NO</strong>
                    </Label>
                    <Input
                      type="tel"
                      id="phoneNo"
                      name="phoneNo"
                      placeholder="PHONE NO"
                      value={this.state.phoneNo}
                      valid={errors.phoneNo === ""}
                      invalid={errors.phoneNo !== ""}
                      onBlur={this.handleBlur("phoneNo")}
                      onChange={this.handleInputChange}
                    />
                    <FormFeedback>{errors.phoneNo}</FormFeedback>
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
                      placeholder="POLICE STATION"
                      value={this.state.policeStation}
                      onBlur={this.handleBlur("policeStation")}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>

                <div>
                  <FormGroup row>
                    <p
                      className="overflow-auto"
                      style={{ height: "200px", background: "#dde7ea" }}
                    >
                      <strong>GENERAL CONDITIONS FOR ACCOMMODATION</strong>
                      <br />
                      <strong>A. Order of Priority:</strong>
                      <br /> First year students and Fourth Year students who
                      are from outside the Jaffna District will be considered
                      for accommodation.
                      <br />
                      <br /> <strong>B. Period of Accommodation:</strong>
                      <br /> Students will be given accommodation for a maximum
                      of One Year at a time.
                      <br />
                      <br />{" "}
                      <strong>C. Rules and regulations in of the Hostel</strong>
                      <br />
                      1. Ragging is strictly prohibited inside the hostel
                      premises.
                      <br /> 2. The students should be respectfully dressed on
                      leaving the room for any purpose.
                      <br /> 3. The students themselves are personally
                      responsible to safeguard their belongings. Any theft of
                      Laptop, mobile phone, computer, purse, calculator,
                      wristwatch, wallet or any other valuable item is the sole
                      responsibility of the student.
                      <br />
                      4. Students, in their own interest, are advised not to
                      keep excess cash or any valuables in their hostel rooms.
                      They are cautioned to be very careful about safety of
                      their belongings. They should close their rooms securely
                      when they leave the room even for short periods or when
                      they are sleeping. Institute shall not be responsible for
                      the loss of such items due to theft or otherwise. However,
                      in the case of theft, the matter should be immediately
                      reported to the concerned Sub-Warden/Warden of the Hostel.
                      <br />
                      5. Students are prohibited from giving shelter to any
                      other student/outsider in the rooms. In case of any
                      unauthorized shelter, the student will be liable to
                      disciplinary action.
                      <br /> 6. Resident students are not permitted to invite
                      any outside person to address any meeting in the hostel
                      without written permission of the Warden/Dean.
                      <br /> 7. Students are expected to switch off the lights
                      and fans in their rooms every time they go out and take
                      precautions to economies electricity consumption. The
                      students are not permitted to use any private electrical
                      appliances and other similar appliances are prohibited.
                      Boarders are warned against tempering with electric
                      installation and for all electric repairs the electrician
                      should be called in.
                      <br /> 8. Student should not drive nails, screws etc. into
                      the wall or doors. No repair shall be done by the students
                      themselves. They should approach the Sub Warden who will
                      arrange for repairs.
                      <br /> 9. Male students are strictly forbidden from
                      entering the Girls' Hostel and female students from
                      entering Boy’s Hostel.
                      <br /> 10.Students are strictly prohibited from consuming
                      alcoholic drinks, drugs, cigarettes, tobacco products or
                      any other intoxicants or any form of smoking, inside the
                      hostel or to enter the hostel after consuming the same.
                      Any student found consuming such thing or in a drunken
                      state in the hostel will render himself liable for strict
                      disciplinary action, including expulsion/ rustication from
                      Hostel/Faculty.
                      <br /> 11.Any form of creating sound pollution including
                      playing music loudly is not allowed. Any celebration will
                      be treated as illegal and any action may be initiated
                      against him.
                      <br /> 12.Every student shall keep the room allotted to
                      him / her clean and neat. He / She shall take proper care
                      of the furniture and fixtures handed over to him / her.
                      The hostel authorities have the right to enter and inspect
                      the rooms at any time, even in the absence of students.
                      <br /> 13.Students should not use abusive/foul language.
                      <br /> 14.Any combined activities should be held in the
                      open space with the permission of the Wardens and
                      Assistant Registrar / Welfare Services through respective
                      Sub Wardens.
                      <br /> 15.Drinking water should be used only for drinking
                      purposes.
                      <br /> 16.All wastes including sanitary pads and left over
                      food should be disposed in containers kept for the
                      specific purpose and they should not be thrown
                      indiscriminately all over the hostel leading to un –
                      hygienic consequences and blocking of the waste water
                      channels.
                      <br />
                      <strong>
                        <br /> Damages and Recovery <br />
                      </strong>
                      <br />
                      1. Rough handling of room furniture or any furniture /
                      property or fittings of the hostel is strictly forbidden.{" "}
                      <br />
                      2. The cost of damages will be recovered in the following
                      manner: <br />
                      <li>
                        {" "}
                        If any individual or group is identified to have caused
                        the damage, double the cost will be recovered from
                        him/her/group.
                      </li>
                      <br />{" "}
                      <li>
                        If damage is done in anyone of the rooms and the
                        person(s) is / are not identified then double the cost
                        will be recovered from the room-mates collectively.
                        <br />
                      </li>
                      <li>
                        If a damage is done outside the rooms i.e., in common
                        places like corridors, bathrooms, lecture halls, canteen
                        etc., and the person(s) is/ are not identified, then
                        double the cost will be recovered, floor wise or block
                        wise or on the whole, as the case may be. Repetition of
                        damage to the hostel property will result in expulsion
                        from the hostel.
                      </li>
                    </p>
                  </FormGroup>
                </div>

                <p>
                  <strong>DECLARATION TO BE SIGNED BY THE STUDENT</strong>
                </p>

                <FormGroup row>
                  <Col>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="checkbox"
                          name="agree"
                          checked={this.state.agree}
                          onChange={this.handleInputChange}
                        />{" "}
                        <strong>
                          {" "}
                          I have read all the rules and regulations of the
                          hostel annexed with this application form care fully.
                          I hereby agree to abide by the rules and regulations
                          of the hostel in force from time to time.I am liable
                          for dicipilinary action in case of any breach.
                        </strong>
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md={{ size: 2, offset: 10 }}>
                    <Button type="submit" color="primary">
                      REGISTER
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

export default Registration;
