import React, { Component } from "react";
import { connect } from "react-redux";
import ChessGame from "../../../ChessGame";
import "../../css/lobby.css";
import { WhiteDetails } from "./WhiteDetails";
import { BlackDetails } from "./BlackDetails";
import { WhitePlayer } from "./WhitePlayer";

export class Game extends Component {
  render() {
    console.log("TEST.JS");
    console.log(this.props.game);
    return (
      <div className="gameContainer">
        <WhitePlayer />
        {/* <WhiteDetails player={this.props.game.white} /> */}
        <div className="gameWindow">{ChessGame()}</div>
        <BlackDetails player={this.props.game.black} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game
});

export default connect(mapStateToProps, {})(Game);
