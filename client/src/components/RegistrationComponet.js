import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, FormFeedback, Breadcrumb, BreadcrumbItem  } from 'reactstrap';
import { Link } from 'react-router-dom'; 


class Registration  extends Component {
 

    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            surname: '',
            dob:'',
            nic:'',
            Contactnum: '',
            email: '',
            residentialaddress:'',
            district:'',
            GSdivision:'',
            DSdivision:'',
            RegNo:'',
            faculty:'',
            name:'',
            relationship:'',
            residentialaddress2:'',
            policestation:'',
            agree: false,
           
            touched: {
                fullname: false,
                surname: false,
                dob: false,
                nic:false,
                Contactnum: false,
                email: false,
                residentialaddress:false,
                district:false,
                GSdivision:false,
                DSdivision:false,
                RegNo:false,
                name:false,
                relationship:false,
                residentialaddress2:false,
                policestation:false


            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleSubmit(event) {
        console.log('Current State is: ' + JSON.stringify(this.state));
        alert('Current State is: ' + JSON.stringify(this.state));
        event.preventDefault();
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    validate(fullname, surname, nic, Contactnum , email ,RegNo ,name) {
        const errors = {
            fullname: '',
            surname: '',
            nic:'',
            Contactnum: '',
            email: '',
            RegNo:'',
            name:''
           
        };

        if (this.state.touched.fullname && fullname.length < 3)
            errors.fullname = 'Full Name should be >= 3 characters';
        else if (this.state.touched.fullname && fullname.length > 10)
            errors.fullname = 'Full Name should be <= 20 characters';

        if (this.state.touched.surname && surname.length < 3)
            errors.surname = 'Sur Name should be >= 3 characters';
        else if (this.state.touched.surname && surname.length > 10)
            errors.surname = 'Sur Name should be <= 20 characters';

        if (this.state.touched.nic && nic.length < 10)
            errors.nic = 'NIC should be >= 10 characters';

        const reg = /^\d+$/;
        if (this.state.touched.Contactnum && !reg.test(Contactnum))
            errors.Contactnum = 'Contactnum should contain only numbers';

        if(this.state.touched.email && email.split('').filter(x => x === '@').length !== 1)
            errors.email = 'Email should contain a @';

        if (this.state.touched.name && name.length < 3)
            errors.name = 'Name should be >= 3 characters';
        else if (this.state.touched.name && name.length > 10)
            errors.name = 'Name should be <= 20 characters';
        return errors;
    }
    
    render() {
        const errors = this.validate(this.state.fullname, this.state.surname, this.state.nic, this.state.Contactnum ,this.state.email, this.state.RegNo,this.state.name);
    return(
   
    <div className="container">
   

      <div className="container">
                    <div className="row">
                      <Breadcrumb>
                          <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                          <BreadcrumbItem active>Registration</BreadcrumbItem>
                      </Breadcrumb>
                    </div> 
        </div>
        <hr />
       <div className="row">
        <div className="col-12 col-sm-2"> 
           <img src='assets/images/LOGOUOJ.png'  className="img-fluid rounded-circle"  height="50" width="50" alt='LOGOUOJ' />
        </div>
        <div className="col-12 col-sm-10">
             <h4>Hostel Registration System</h4>
             <p>University of Jaffna</p>
        </div>
    </div>
    
    <div className="row row-content">
       <div className="col-12">
          <Form onSubmit={this.handleSubmit}>
             <div className="col-12 col-md-9">
             <p><strong>HOSTEL REGISTRATION FORM .</strong>Student Particulars</p>
             <FormGroup row>
                 <Col md={10}>
                   <Label htmlFor="fullname" ><strong>FULL NAME</strong></Label>
                   <Input type="text" id="fullname" name="fullname"
                           placeholder="FULL NAME"
                           value={this.state.fullname}
                           valid={errors.fullname === ''}
                           invalid={errors.fullname !== ''}
                           onBlur={this.handleBlur('fullname')}
                           onChange={this.handleInputChange} />
                          <FormFeedback>{errors.fullname}</FormFeedback>   
                </Col>                
            </FormGroup> 
            
            <FormGroup row>
                <Col md={10}>
                  <Label htmlFor="surname" ><strong>SUR NAME</strong></Label>
                  <Input type="text" id="surname" name="surname"
                         placeholder="SUR NAME"
                         value={this.state.surname}
                         valid={errors.surname === ''}
                         invalid={errors.surname !== ''}
                         onBlur={this.handleBlur('surname')}
                         onChange={this.handleInputChange} />
                        <FormFeedback>{errors.surname}</FormFeedback>   
                </Col>              
            </FormGroup>
            


       <FormGroup row>
          <Col md={3}>
           <Label htmlFor="dob" ><strong>DATE OF BIRTH</strong></Label>
           <Input type="date" id="dob" name="dob"
                         placeholder="DATE OF BIRTH"
                         value={this.state.dob}
                         onBlur={this.handleBlur('dob')}
                         onChange={this.handleInputChange} />
                       
          </Col>
          <Col md={3}>
           <Label htmlFor="nic" ><strong>NIC</strong></Label>
           <Input type="text" id="nic" name="nic"
                         placeholder="NIC"
                         value={this.state.nic}
                         valid={errors.nic === ''}
                         invalid={errors.nic !== ''}
                         onBlur={this.handleBlur('nic')}
                         onChange={this.handleInputChange} />
                        <FormFeedback>{errors.nic}</FormFeedback>
          </Col>
          <Col md={3}>
           <Label htmlFor="Contactnum" ><strong>CONTACT NUMBER</strong></Label>
           <Input type="tel" id="Contactnum" name="Contactnum"
                         placeholder="CONTACT NUMBER"
                         value={this.state.Contactnum}
                         valid={errors.Contactnum === ''}
                         invalid={errors.Contactnum !== ''}
                         onBlur={this.handleBlur('Contactnum')}
                         onChange={this.handleInputChange} />
                        <FormFeedback>{errors.Contactnum}</FormFeedback>
          </Col>                    
       </FormGroup>
      
        <FormGroup row>
           <Col md={6}>
           <Label htmlFor="email" ><strong>EMAIL ID</strong></Label>
            <Input type="email" id="email" name="email"
               placeholder="EMAIL ID"
               value={this.state.email}
               valid={errors.email === ''}
               invalid={errors.email !== ''}
               onBlur={this.handleBlur('email')}
               onChange={this.handleInputChange} />
            <FormFeedback>{errors.email}</FormFeedback>
            </Col>
         </FormGroup>
         </div>

         <div className="col-12">
         <FormGroup row>
         <Col md={6}>
           <Label htmlFor="residentialaddress" ><strong>RESIDENTIAL ADDRESS</strong></Label>
           <Input type="text" id="residentialaddress" name="residentialaddress"
                         placeholder="RESIDENTIAL ADDRESS"
                         value={this.state.residentialaddress}
                         onBlur={this.handleBlur('residentialaddress')}
                         onChange={this.handleInputChange} />
                       
          </Col>    
          <Col md={2}>
           <Label htmlFor="district" ><strong>DISTRICT</strong></Label>
           <Input type="text" id="district" name="district"
                         placeholder="DISTRICT"
                         value={this.state.district}
                         onBlur={this.handleBlur('district')}
                         onChange={this.handleInputChange} />
                       
          </Col>   
          <Col md={2}>
           <Label htmlFor="GSdivision" ><strong>GS DIVISION</strong></Label>
           <Input type="text" id="GSdivision" name="GSdivision"
                         placeholder="GS DIVISION"
                         value={this.state.GSdivision}
                         onBlur={this.handleBlur('GSdivision')}
                         onChange={this.handleInputChange} />
                       
          </Col>   
           <Col md={2}>
           <Label htmlFor="DSdivision" ><strong>DS DIVISION</strong></Label>
           <Input type="text" id="DSdivision" name="DSdivision"
                         placeholder="DS DIVISION"
                         value={this.state.DSdivision}
                         onBlur={this.handleBlur('DSdivision')}
                         onChange={this.handleInputChange} />
                       
          </Col>    
          </FormGroup> 
          <FormGroup row>
          <Col md={4}>
           <Label htmlFor="RegNo" ><strong>UNIVERSITY REGISTRATION NUMBER</strong></Label>
           <Input type="text" id="RegNo" name="RegNo"
                         placeholder="UNIVERSITY REGISTRATION NUMBER"
                         value={this.state.RegNo}
                         valid={errors.RegNo === ''}
                         invalid={errors.RegNo !== ''}
                         onBlur={this.handleBlur('RegNo')}
                         onChange={this.handleInputChange} />
                        <FormFeedback>{errors.nic}</FormFeedback>
          </Col>
          <Col md={2}>
          <Label htmlFor="faculty" ><strong>FACULTY</strong></Label>
                    <Input type="select" name="faculty"
                        value={this.state.faculty}
                        onChange={this.handleInputChange}>
                        <option>SCIENCE</option>
                        <option>LAW</option>
                        <option>MEDICINE</option>
                        <option>ARTS</option>
                        <option>AGRICULTURE</option>
                        <option>MANAGEMENT</option>
                    </Input>
            </Col>
            <Col md={2}>
            <Label htmlFor="course" ><strong>COURSE OF STUDY</strong></Label>
                    <Input type="select" name="course"
                        value={this.state.course}
                        onChange={this.handleInputChange}>
                        <option>COMPUTER SCIENCE</option>
                        <option>PHYSICAL SCIENCE</option>
                        <option>BIO SCIENCE</option>
                        <option>COMMERCE</option>
                        <option>LAW</option>
                        <option>ARTS & LITERATURE</option>
                    </Input>
             </Col>
             <Col md={2}>
             <Label htmlFor="year" ><strong>YEAR  OF STUDY</strong></Label>
                    <Input type="select" name="year"
                        value={this.state.year}
                        onChange={this.handleInputChange}>
                        <option>1ST YEAR</option>
                        <option>4TH YEAR</option>   
                    </Input>
             </Col>
             <Col md={2}>
             <Label htmlFor="preference" ><strong>HOSTELPREFERENCE</strong></Label>
                    <Input type="select" name="preference"
                        value={this.state.preference}
                        onChange={this.handleInputChange}>
                        <option>KONDAVIL</option>
                        <option>KOKUVIL</option>   
                    </Input>
             </Col>            
          </FormGroup>

           <p><strong>PERSON TO CONTACT IN CASE OF EMERGENCY</strong></p>
           
           <FormGroup row>
                 <Col md={4}>
                   <Label htmlFor="name" ><strong>NAME</strong></Label>
                   <Input type="text" id="name" name="name"
                           placeholder="NAME"
                           value={this.state.name}
                           valid={errors.name === ''}
                           invalid={errors.name !== ''}
                           onBlur={this.handleBlur('name')}
                           onChange={this.handleInputChange} />
                          <FormFeedback>{errors.name}</FormFeedback>   
                </Col> 
                <Col md={3}>
                <Label htmlFor="relationship" ><strong>RELATIONSHIP</strong></Label>
                    <Input type="select" name="relationship"
                        value={this.state.relationship}
                        onChange={this.handleInputChange}>
                        <option>FATHER</option>
                        <option>MOTHER</option>   
                    </Input>                   
                </Col> 
                <Col md={5}>
                <Label htmlFor="residentialaddress2" ><strong>RESIDENTIAL ADDRESS</strong></Label>
                <Input type="text" id="residentialaddress2" name="residentialaddress2"
                         placeholder="RESIDENTIAL ADDRESS"
                         value={this.state.residentialaddress2}
                         onBlur={this.handleBlur('residentialaddress2')}
                         onChange={this.handleInputChange} />
                       
                </Col>     
            </FormGroup> 
            <FormGroup row>
             <Col md={5}>
              <Label htmlFor="policestation" ><strong>POLICE STATION NEAR BY YOUR HOMETOWN</strong></Label>
                <Input type="text" id="policestation" name="policestation"
                         placeholder="POLICE STATION"
                         value={this.state.policestation}
                         onBlur={this.handleBlur('policestation')}
                         onChange={this.handleInputChange} />
                       
             </Col>
            </FormGroup>

            <p><strong>DECLARATION TO BE SIGNED BY THE STUDENT</strong></p>

           
            <FormGroup row>
                <Col >
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox"
                                name="agree"
                                checked={this.state.agree}
                                onChange={this.handleInputChange} /> {' '}
                            <strong> I have read all the rules and regulations of the hostel annexed with this application form care fully. I hereby agree to abide by the rules 
                                     and regulations of the hostel in force from time to time.I am liable for dicipilinary action in case of any branch.</strong>
                        </Label>
                    </FormGroup>
                </Col>
            </FormGroup>
           
            <FormGroup row>
                <Col md={{size: 2, offset: 10}}>
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

export default  Registration;
