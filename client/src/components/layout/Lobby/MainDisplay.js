import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../css/lobby.css";
import { Button } from "reactstrap";

export class MainDisplay extends Component {
  render() {
    return (
      <div className="main container">
        <h2>Welcome to Chess 960!</h2>
        <Button color="primary" size="lg">
          Play Now!
        </Button>
      </div>
    );
  }
}

export default MainDisplay;
