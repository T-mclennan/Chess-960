import React, { Component } from "react";
import AuthWindow from "../auth/AuthWindow";
import "../../../src/App.css";

export class Landing extends Component {
  render() {
    return (
      <div className="outsideApp">
        <AuthWindow style={{ marginTop: "80px" }} />
      </div>
    );
  }
}

export default Landing;
