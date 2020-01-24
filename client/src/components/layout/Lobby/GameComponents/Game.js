import React, { Component } from "react";
import { connect } from "react-redux";
import ChessGame from "../../../ChessGame";
import WhiteDetails from "./WhiteDetails";
import BlackDetails from "./BlackDetails";
import "../../css/lobby.css";

export class Game extends Component {
  render() {
    return (
      <div className="gameContainer">
        <WhiteDetails />
        <div className="gameWindow">{ChessGame()}</div>
        <BlackDetails />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game
});

export default connect(mapStateToProps, {})(Game);
