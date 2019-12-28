import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChessQueen, faSkating } from "@fortawesome/free-solid-svg-icons";
import "../css/lobby.css";
// import "../../../src/App.css";

export class LeftSidebar extends Component {
  render() {
    return (
      <div className="leftsidebar">
        <div style={{ fontSize: "2rem" }}>
          <FontAwesomeIcon
            icon={faChessQueen}
            className="fa-2x fa-border fa-in"
            data-fa-transform="grow-6"
          />
        </div>
      </div>
    );
  }
}

export default LeftSidebar;
