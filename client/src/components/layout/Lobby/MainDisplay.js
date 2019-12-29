import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import Dashboard from "./MainContent/Dashboard";
import "../css/lobby.css";
import { Button } from "reactstrap";

export class MainDisplay extends Component {
  render() {
    return <Dashboard />;
  }
}

export default connect()(MainDisplay);
