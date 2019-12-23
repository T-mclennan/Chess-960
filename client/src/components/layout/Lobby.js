import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import GameWindow from "../GameWindow";
import "./css/inApp.css";

export class Lobby extends Component {
  render() {
    return (
      <div
        className="Wrapper inApp"
        // style={lobbyStyle}
      >
        {/* <Header /> */}
        {/* <GameWindow style={{ marginBottom: "15px" }} /> */}
        <h2>THIS IS A LOBBY!</h2>
      </div>
    );
  }
}

// const lobbyStyle = {
//   backgroundColor: '#505255',
//   height: "100vh",
//   background: "#0F2027",
//   background: "-webkit-linear-gradient(45deg, #0F2027 , #203A43,#2C5364)",
//   background: "linear-gradient(45deg,  #203A43, #0F2027,#2C5364)"
// };

export default Lobby;
