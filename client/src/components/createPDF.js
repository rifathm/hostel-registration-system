import React, { Component } from "react";

import ReactToPrint from "react-to-print";
import ViewStudents from "../Dashboard/components/ViewStudents";

class ComponentToPrint extends Component {
  render() {
    return (
      <>
        <div>
          <ViewStudents />
        </div>
      </>
    );
  }
}

export default class example extends Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => {
            return <button>Print</button>;
          }}
          content={() => this.componentRef}
          copyStyles
          pageStyle={false}
        />
        <ComponentToPrint ref={(e1) => (this.componentRef = e1)} />
      </div>
    );
  }
}
