import React, { Component } from "react";
import { Button } from "reactstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChessQueen,
  faSkating,
  faExclamation,
  faListOl,
  faSearch,
  faChessBoard
  // faPlayCircle
} from "@fortawesome/free-solid-svg-icons";

import { faPlayCircle, faUser } from "@fortawesome/free-regular-svg-icons";
import FontAwesome from "react-fontawesome";
// import faStyles from "font-awesome/css/font-awesome.css";
import "../css/lobby.css";
// import "../../../src/App.css";

export class LeftSidebar extends Component {
  render() {
    return (
      <div className="leftsidebar">
        <Button style={sidebarButton} onClick={{}}>
          <FontAwesomeIcon
            icon={faUser}
            className="icon far fa-2x fa-in"
            size="2x"
          />
          <div style={{ marginTop: "0.5rem" }}> Dashboard</div>
        </Button>

        <Button style={sidebarButton} onClick={{}}>
          <FontAwesomeIcon
            icon={faPlayCircle}
            className="icon far fa-2x fa-in"
            size="2x"
          />
          <div style={{ marginTop: "0.5rem" }}>Quickplay</div>
        </Button>

        <Button style={sidebarButton} onClick={{}}>
          <FontAwesomeIcon
            icon={faChessBoard}
            className="icon far fa-2x fa-in"
            size="2x"
          />
          <div style={{ marginTop: "0.5rem" }}>New Game</div>
        </Button>

        <Button style={sidebarButton} onClick={{}}>
          <FontAwesomeIcon
            icon={faSearch}
            className="icon far fa-2x fa-in"
            size="2x"
          />
          Find Game
        </Button>

        <Button style={sidebarButton} onClick={{}}>
          <FontAwesomeIcon
            icon={faListOl}
            className="icon far fa-2x fa-in"
            size="2x"
          />
          Scoreboard
        </Button>
      </div>
    );
  }
}

const sidebarButton = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "black",
  padding: "1rem",
  width: "8rem",
  margin: "auto",
  borderColor: "black"
};

export default LeftSidebar;
