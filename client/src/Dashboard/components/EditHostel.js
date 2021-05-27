import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";

class EditHostel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      warden: "",
      subWarden: "",

      touched: {
        name: false,
        warden: false,
        subWarden: false,
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    axios.get(`/hostels/${this.props.match.params.id}`).then((res) => {
      const { name, warden, subWarden, contactNo, address, location } =
        res.data.hostels;
      this.setState({
        name,
        warden,
        subWarden,
        contactNo,
        address,
        location,
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

    const { touched, ...values } = this.state;
    axios
      .put(`/hostels/${this.props.match.params.id}`, {
        _id: this.props.match.params.id,
        ...values,
      })
      .then(() => alert("successfully updated"))

      .catch((err) => alert(err));

    console.log(this.state);
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
            <h4>EDIT HOSTEL DETAILS</h4>
          </div>
        </div>

        <div className="col-12 col-sm-8"></div>

        <div className="row row-content">
          <div className="col-12">
            <Form onSubmit={this.handleSubmit}>
              <div className="col-12">
                <FormGroup row>
                  <Label htmlFor="name">
                    <strong>HOSTEL NAME</strong>
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="HOSTEL NAME"
                    value={this.state.name}
                    onBlur={this.handleBlur("name")}
                    onChange={this.handleInputChange}
                  />

                  <Label htmlFor="warden">
                    <strong>WARDEN</strong>
                  </Label>
                  <Input
                    type="text"
                    id="warden"
                    name="warden"
                    placeholder="WARDEN"
                    value={this.state.warden}
                    onBlur={this.handleBlur("warden")}
                    onChange={this.handleInputChange}
                  />

                  <Label htmlFor="subWarden">
                    <strong>Sub-Warden</strong>
                  </Label>
                  <Input
                    type="subWarden"
                    id="subWarden"
                    name="subWarden"
                    placeholder="subWarden"
                    value={this.state.subWarden}
                    onBlur={this.handleBlur("subWarden")}
                    onChange={this.handleInputChange}
                  />

                  <Label htmlFor="contactNo">
                    <strong>Contact No</strong>
                  </Label>
                  <Input
                    type="text"
                    id="contactNo"
                    name="contactNo"
                    placeholder="contactNo"
                    value={this.state.contactNo}
                    onBlur={this.handleBlur("contactNo")}
                    onChange={this.handleInputChange}
                  />

                  <Label htmlFor="address">
                    <strong>Address</strong>
                  </Label>
                  <Input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Address"
                    value={this.state.address}
                    onBlur={this.handleBlur("address")}
                    onChange={this.handleInputChange}
                  />
                  <Label htmlFor="location">
                    <strong>location</strong>
                  </Label>
                  <Input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="location"
                    value={this.state.location}
                    onBlur={this.handleBlur("location")}
                    onChange={this.handleInputChange}
                  />
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

export default withRouter(EditHostel);
