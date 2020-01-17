import React, { Component } from "react";
import { connect } from "react-redux";
import ChessGame from "../../../ChessGame";
import "../../css/lobby.css";
import WhiteDetails from "./WhiteDetails";
import BlackDetails from "./BlackDetails";
import { WhitePlayer } from "./WhitePlayer";
import { WhiteDeets } from "./WhiteDeets";
import White from "./White";
import Test from "./Test";

export class Game extends Component {
  render() {
    console.log("TEST.JS");
    console.log(this.props.game);
    return (
      <div className="gameContainer">
        <WhiteDetails />
        {/* <WhiteDetails player={this.props.game.white} /> */}
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
