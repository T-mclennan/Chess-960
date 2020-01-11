import React, { Component } from "react";
import { connect } from "react-redux";
import ChessGame from "../../../ChessGame";
import "../../css/lobby.css";

export class Game extends Component {
  render() {
    return (
      <div className="gameContainer">
        <div>{ChessGame()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player
});

export default connect(mapStateToProps, {})(Game);
