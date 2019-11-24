import React, { Component } from 'react'
import io from 'socket.io-client'
import ChessGame from './ChessGame';
import PlayerModal from './PlayerModal';

class GameWindow extends Component {

  state = {
    playerName: ''
  }

  addName = (name) => {
    this.setState({playerName: name})
  }

  render() {


    // const board = new boardGeneration()
    // const fen = board.generateBoard()
    // console.log("pre-pass fen is: "+fen)

    // var game = Chess(this.state.gameFen);

    return (
      
      <div className="centered" style={containerStyle}>
        <PlayerModal addName={this.addName}/>
        <ChessGame user={this.playerName}/>
      </div>
    )
  }
}

const containerStyle = {
  margin: '1.1rem',
}

export default GameWindow