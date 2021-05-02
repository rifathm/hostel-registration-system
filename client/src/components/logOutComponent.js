import React, { Component } from "react";
import "whatwg-fetch";

class logOutCom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      token: "",
    };
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage("the_main_app");

    if (obj && obj.token) {
      const { token } = obj;
      //verify token
      fetch("/user/logOut?token=" + token)
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            this.setState({
              token: "",
              isLoading: false,
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: true,
      });
    }
  }
}

export default withRouter(logOutCom);
