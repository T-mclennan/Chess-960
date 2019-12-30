import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../css/lobby.css";
// import "../../../src/App.css";

export class RightSidebar extends Component {
  render() {
    return (
      <div className="rightsidebar">
        <div style={playerBox}></div>
      </div>
    );
  }
}
const playerBox = {
  margin: "1px",
  width: "7rem",
  // border: "1px solid #585858",
  backgroundColor: "#707070"
};
export default RightSidebar;
