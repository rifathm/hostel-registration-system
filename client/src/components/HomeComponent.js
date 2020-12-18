import React, { Component } from 'react';
import Carouselcom from './CarouselComponent';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
   return(
     
    <div className="container">
      <div className="row ">
        <div className="col-12 col-md-10 offset-1">
        <hr />
           < Carouselcom />
          
        </div>
      </div>
      <hr />
        <div className="row">
           <div className="col-12 col-md-4 offset-1 ">  
           <img src='assets/images/hostel.jpg'     alt='hostel'  /> 
           </div>
           <div className="col-12 col-md-6 ">
                  
                    <h2>STUDENT ACCOMMODATION</h2>
                    <p>Several student hostels are available which are administrated by the University.Hostel facilities are provided for a limited number of students by the university. These hostels are situated within the university premises and outside. Staff members are appointed to be part time wardens of those hostels. Only the students who are in First Year and Final Year are eligible to get hostel facilities. First Year and Final Year students are requested to get more information  for their eligibility.</p>
           </div>
        </div>
      </div>
    );
   }
 }

export default Home;   