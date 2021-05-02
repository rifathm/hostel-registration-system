import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  Media,
} from "reactstrap";
import { Link } from "react-router-dom";
import Layout from "./Layout";

function About(props) {
  const RenderStaff = props.staffs.map((staff) => {
    return (
      <div key={staff.id} className="col-12 mt-2">
        <Media tag="li">
          <Media left middle>
            <Media
              object
              src={staff.image}
              alt={staff.name}
              className="img-fluid rounded-circle"
              height="50"
              width="50"
            />
          </Media>
          <Media body className="ml-5">
            <Media heading>{staff.name}</Media>
            <p>{staff.designation}</p>
            <p>{staff.description}</p>
          </Media>
        </Media>
      </div>
    );
  });

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>About Us</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>About Us</h3>
            <hr />
          </div>
        </div>
        <div className="row row-content">
          <div className="col-12 col-md-6">
            <h2>Our History</h2>
            <p>Started in 2000.... //History</p>
            <p>
              Student welfare branch maintains 17 hostels for the undergraduate
              students in the following locations. Students from the families in
              the lower-income group and from distant residences are given
              preference. Rs.XXXX is charged as the hostel fee for an academic
              year and Rs.xxxx is charged as a hostel admission fee. The warden
              is the senior member of the Academic Staff and he/she is
              responsible for the disciplinary matters in hostels under the
              guidance and control of the Vice-Chancellor. The Sub – Warden is a
              resident fulltime sub-warden resides in each hostel.
            </p>
          </div>
          <div className="col-12 col-md-6">
            <Card>
              <CardHeader className="bg-primary text-white">
                Facts At a Glance
              </CardHeader>
              <CardBody>
                <dl className="row p-1">
                  <dt className="col-6">Started</dt>
                  <dd className="col-6">ddmmyyyy</dd>
                  <dt className="col-6">Located in </dt>
                  <dd className="col-6">Jaffna</dd>
                  <dt className="col-6">University Owned Hostels</dt>
                  <dd className="col-6">17</dd>
                  <dt className="col-6">Wardens & Sub Wardens</dt>
                  <dd className="col-6">30</dd>
                </dl>
              </CardBody>
            </Card>
          </div>
          <div className="col-12"></div>
        </div>
        <div className="row row-content">
          <div className="col-12">
            <h2>Administrators & Staff </h2>
          </div>
          <div className="col-12">
            <Media list>{RenderStaff}</Media>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default About;
