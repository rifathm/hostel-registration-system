import React, { Component } from 'react';
import  {useState} from 'react';
import { Collapse, CardBody, Card, CardHeader,Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { HOSTELS } from '../shared/hostels';
import { Link } from 'react-router-dom';




class Location  extends Component {
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
    this.setState({ collapse: this.state.collapse === Number(event) ? 0 : Number(event) });
  }


  render() {
    const {hostels, collapse} = this.state;
    return (
      <div className="container">
          <div className="row">
                      <Breadcrumb>
                          <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                          <BreadcrumbItem active>Guidelines</BreadcrumbItem>
                      </Breadcrumb>
          </div>

        < hr />
        <div className="col-12 col-md">
         <h3 className="page-header">Hostel & Location</h3>
          {hostels.map(hostel => {
            return (
              <Card style={{ marginBottom: '1rem' }} key={hostel.id}>
                <CardHeader  className="bg-secondary text-white" onClick={this.toggle} data-event={hostel.id}>{hostel.name}</CardHeader>
                <Collapse isOpen={collapse === hostel.id}>
                <CardBody>
                       <div className=" col-md-6">
                           <dl>
                                <div className="col-12">
                                <dt >Warden</dt>
                                <dd >{hostel.warden}</dd>
                                </div>
                                <dt className="col-6">Sub Warden </dt>
                                <dd className="col-6">{hostel.subWarden}</dd>
                                <dt className="col-6">Address</dt>
                                <dd className="col-6">{hostel.address}</dd>
                                <dt className="col-6">Telephone Number</dt>
                                <dd className="col-6">{hostel.tel}</dd>
                            </dl>
                        </div>  
                        <div className=" col-md">
                          {hostel.maplocation}  
                        </div>  
                </CardBody>
                </Collapse>
              </Card>
              
            )
          })}     
  
        </div>
      </div>
    );
  }
}

export default Location;