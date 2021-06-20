import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Editfeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      message: "",
      reply: "",

      touched: {
        firstname: false,
        message: false,
        reply: false,
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    axios.get(`/feedback/${this.props.match.params.id}`).then((res) => {
      const { firstname, message, reply } = res.data.inquerys;
      this.setState({
        firstname,
        message,
        reply,
      });
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const firstname = target.name;

    this.setState({
      [firstname]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { touched, ...values } = this.state;
    axios
      .put(`/feedback/${this.props.match.params.id}`, {
        _id: this.props.match.params.id,
        ...values,
        isReplied: true,
      })
      .then(() => alert("Reply Send"))
      .then((res) => {
        window.location = `/dashboard/feedbacks`;
      })
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
            <h4>Sending Reply To Feedbacks</h4>
          </div>
        </div>

        <div className="col-12 col-sm-8"></div>

        <div className="row row-content">
          <div className="col-12">
            <Form onSubmit={this.handleSubmit}>
              <div className="col-12">
                <FormGroup row>
                  <Label htmlFor="firstname">
                    <strong>First Name</strong>
                  </Label>
                  <Input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={this.state.firstname}
                    onBlur={this.handleBlur("firstname")}
                    onChange={this.handleInputChange}
                  />

                  <Label htmlFor="message">
                    <strong>Feedback</strong>
                  </Label>
                  <Input
                    type="text"
                    id="message"
                    name="message"
                    placeholder="message"
                    value={this.state.message}
                    onBlur={this.handleBlur("message")}
                    onChange={this.handleInputChange}
                  />

                  <Label htmlFor="reply">
                    <strong>Reply For the Feedback</strong>
                  </Label>
                  <Input
                    type="reply"
                    id="reply"
                    name="reply"
                    placeholder="reply"
                    value={this.state.reply}
                    onBlur={this.handleBlur("reply")}
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

export default withRouter(Editfeedback);
