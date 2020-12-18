import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import  About from  './AboutComponent';
import  Registration from  './RegistrationComponet';
import Contact from './ContactComponent';
import Footer from './FooterComponent';
import Location from './LocationComponent';
import { staffs } from '../shared/staffs';
import { Switch, Route, Redirect } from 'react-router-dom';
/* .. ------> go up one level src  */
/*---Container */

class Main  extends Component {

  constructor(props) {
    super(props);
    this.state = {
      staffs : staffs
    };
  }

  
  render(){
    
     

    return (
    <div>
    <Header />
    <Switch>
       <Route path='/home' component={Home} />
       <Route path='/aboutus' component={() => <About staffs={this.state.staffs} />} />
       <Route exact path='/registration' component={Registration } />
      <Route exact path='/contact' component={Contact } />
       <Route exact path='/guide'  component={Location } />
       <Redirect to="/home" />    
    </Switch>   
    < Footer />
    </div>
  );
}
}

export default Main;
