import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../css/lobby.css";
import LeftSidebar from "./LeftSidebar";
import MainDisplay from "./MainDisplay";
import RightSidebar from "./RightSidebar";
// import "../../../src/App.css";

export class Lobby extends Component {
  render() {
    return (
      <div className="content">
        <LeftSidebar />
        <MainDisplay />
        <RightSidebar />
      </div>
    );
  }
}

export default Lobby;
