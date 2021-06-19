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
              Presently, the University has Eight permanent hostels, Seven
              temporary private houses and the number of students, who were
              provided with accommodation by the University. Six private houses
              at Inuvil, Kokuvil East, Kopay South, Manipay, Kandarmadam,
              Kaithady and Chunnakam were taken on lease during this year.
              <br />
              During the year 2019, 3202 undergraduate were provided
              accommodation in the University Hostels and 158 students were
              accommodated in the leased-out houses. Accordingly, the University
              had provided hostel accommodation for 2973 undergraduates which
              are nearly 34 % out of 8,762, the total student community.
            </p>
            <h3>Hostel Admission</h3>
            <p>
              Students from the families in the lower income group and from
              distant residences are given preference. Rs.2,650/-(Refendable) is
              charged as the hostel fee for an academic year. Warden is the
              senior member of the Academic Staff and he/she is responsible for
              the disciplinary matters in hostels under the guidance and control
              of the Vice-Chancellor. The Sub – Warden is a resident fulltime
              sub-warden resides in each hostel.
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
                  <dd className="col-6">11/05/1999</dd>
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
