import React, { Component } from "react";
import Home from "./HomeComponent";
import About from "./AboutComponent";
import Registration from "./RegistrationComponet";
import Contact from "./ContactComponent";
import createPdf from "./createPDF";
import Location from "./LocationComponent";
import { staffs } from "../shared/staffs";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import ViewStudent from "../Dashboard/views/ViewStudent";
import Map from "./Map";

/* .. ------> go up one level src  */
/*---Container */

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: staffs,
    };
  }

  render() {
    const location = {
      address: "Kondavil Hostel complex - University of Jaffna, Kondavil",
      lat: 9.697203730542906,
      lng: 80.03528875480569,
    };
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/aboutus"
            component={() => <About staffs={this.state.staffs} />}
          />
          <Route path="/registration" component={Registration} />
          <Route path="/contact" component={Contact} />
          <Route path="/guide" component={Location} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/view-student/:id" component={ViewStudent} />
          <Route path="/create-pdf/:id" component={createPdf} />
          <Route exact path="/">
            <Redirect exact from="/" to="dashboard" />
          </Route>
          {/* <Route path="*">
            <Redirect from="/" to="dashboard" />
          </Route> */}
          <Route
            path="/map"
            render={(props) => <Map location={location} zoomLevel={15} />}
          />
        </Switch>
      </div>
    );
  }
}

export default Main;
