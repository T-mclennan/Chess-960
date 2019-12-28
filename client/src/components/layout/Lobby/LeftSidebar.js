import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChessQueen,
  faSkating
  // faPlayCircle
} from "@fortawesome/free-solid-svg-icons";

import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import FontAwesome from "react-fontawesome";
// import faStyles from "font-awesome/css/font-awesome.css";
import "../css/lobby.css";
// import "../../../src/App.css";

export class LeftSidebar extends Component {
  render() {
    return (
      <div className="leftsidebar">
        <FontAwesomeIcon
          icon={faPlayCircle}
          className="icon far fa-2x fa-in"
          data-far-transform="grow-6"
          size="4x"
        />

        <FontAwesomeIcon
          icon={faPlayCircle}
          className="icon far fa-2x fa-in"
          data-far-transform="grow-6"
          size="4x"
        />

        <FontAwesomeIcon
          icon={faPlayCircle}
          className="icon far fa-2x fa-in"
          // data-fa-transform="grow-5"
          size="4x"
        />

        <FontAwesomeIcon
          icon={faPlayCircle}
          className="icon far fa-2x fa-in"
          // data-fa-transform="grow-5"
          size="4x"
        />

        <FontAwesomeIcon
          icon={faPlayCircle}
          className="icon far fa-2x fa-in"
          data-fa-transform="grow-5"
          size="4x"
        />
      </div>
    );
  }
}

export default LeftSidebar;
