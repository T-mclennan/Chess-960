import React, { Component } from "react";
import ChessGame from "./ChessGame";
import NameInputForm from "./NameInputForm";
import { connect } from "react-redux";
import { updatePlayer } from "../actions/playerActions";
import { initializeGame } from "../actions/gameActions";
import axios from "axios";

/*  TODO: document GameWindow component
//  
*/
class Game extends Component {
  constructor(props) {
    super(props);
  }

  //Adds name and fetches new game:
  addName = name => {
    // console.log(name)
    axios
      .post("/api/games/findGameForPlayer", { username: name })
      .then(response => {
        // console.log(response)
        // console.log(response.data.gameID)
        const { color, gameID, fen } = response.data;
        const payload = {
          color,
          ID: gameID,
          fen
        };
        // console.log('fen: '+response.data.fen)
        this.props.initializeGame(payload);
      })
      .catch(e => console.log(e));
  };

  render() {
    return (
      <div className="centered" style={containerStyle}>
        {!this.state.playerName ? (
          <NameInputForm setUsername={this.addName} />
        ) : (
          <div>{ChessGame()}</div>
        )}
      </div>
    );
  }
}

const containerStyle = {
  margin: "1.1rem"
};

const mapStateToProps = state => ({
  name: state.player.playerName,
  color: state.game.color
});

export default connect(mapStateToProps, { updatePlayer, initializeGame })(Game);
