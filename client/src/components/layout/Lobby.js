import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import GameWindow from "../GameWindow";

export class Lobby extends Component {
  render() {
    return (
      <div className="Wrapper" style={lobbyStyle}>
        {/* <Header /> */}
        {/* <GameWindow style={{ marginBottom: "15px" }} /> */}
      </div>
    );
  }
}

const lobbyStyle = {
  // backgroundColor: '#505255',
  height: "100vh",
  background: "#0F2027",
  /* fallback for old browsers */
  background: "-webkit-linear-gradient(45deg, #0F2027 , #203A43,#2C5364)",
  /* Chrome 10-25, Safari 5.1-6 */
  background: "linear-gradient(45deg,  #203A43, #0F2027,#2C5364)"
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
};

export default Lobby;
