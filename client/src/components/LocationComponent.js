import React, { Component } from "react";
import Layout from "./Layout";
import Map from "./Map";

import {
  Collapse,
  CardBody,
  Card,
  CardHeader,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { HOSTELS } from "../shared/hostels";
import { Link } from "react-router-dom";
import "../App.css";

class Location extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      hostels: HOSTELS,
      collapse: 0,
    };
  }

  toggle(e) {
    let event = e.target.dataset.event;
    this.setState({
      collapse: this.state.collapse === Number(event) ? 0 : Number(event),
    });
  }

  componentWillMount() {
    fetch("/hostels")
      .then((res) => res.json())
      .then((data) => this.setState({ HOSTELS: data.HOSTELS }));
  }

  render() {
    const { collapse } = this.state;
    return (
      <Layout>
        <div className="guide">
          <div className="container">
            <div className="row">
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Guidelines</BreadcrumbItem>
              </Breadcrumb>
            </div>

            <hr />
            <div className="col-12 col-md">
              <h3 className="page-header">Hostel & Location</h3>
              {HOSTELS.map((hostel) => {
                return (
                  <Card style={{ marginBottom: "1rem" }} key={hostel.id} className="text-black">
                    <CardHeader
                      className="bg-secondary text-white"
                      onClick={this.toggle}
                      data-event={hostel.id}
                    >
                      {hostel.name}
                    </CardHeader>
                    <Collapse isOpen={collapse === hostel.id}>
                      <CardBody>
                        <div class="row">
                          <div className=" col-md-4">
                            <dl>
                              <div className="col-6">
                                <dt>Warden</dt>
                                <dd>{HOSTELS.warden}</dd>
                              </div>
                              <dt className="col-6">Sub Warden </dt>
                              <dd className="col-6">{hostel.subWarden}</dd>
                              <dt className="col-6">Address</dt>
                              <dd className="col-6">{hostel.address}</dd>
                              <dt className="col-6">Contact Number</dt>
                              <dd className="col-6">{hostel.tel}</dd>
                            </dl>
                          </div>

                          <div className=" col-md-4">
                            <Map location={hostel.src} />
                          </div>
                        </div>
                      </CardBody>
                    </Collapse>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Location;
