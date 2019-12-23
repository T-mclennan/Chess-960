import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import GameWindow from "../GameWindow";
import "./css/lobby.css";
// import "../../../src/App.css";

export class Lobby extends Component {
  render() {
    return (
      <div className="content">
        <div className="leftsidebar"> </div>
        <div className="main container"> </div>
        <div className="rightsidebar"> </div>
      </div>
    );
  }
}

export default Lobby;
