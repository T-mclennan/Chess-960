import React, { Component } from 'react'
// import Chessboard from 'chessboardjsx'
// import Chess from 'chess.js'
import io from 'socket.io-client'
import ChessGame from './ChessGame';
import boardGeneration from './boardGeneration'
const board = new boardGeneration()

class GameWindow extends Component {

  state = { 
            color: 'white',
            gameFen: board.generateBoard(),
          };


  render() {

    const board = new boardGeneration()
    const fen = board.generateBoard()
    console.log("pre-pass fen is: "+fen)
    var socket = io("http://localhost:5000");
    // var game = Chess(this.state.gameFen);

    // console.log(game.fen())
    return (
      
      <div className="centered" style={containerStyle}>
        {/* <Chessboard 
            position='start'
            orientation={this.state.color}
            onDrop={(source, target) => {
              let move = game.move({from: source, to: target});
              console.log(move);
              if (game.move({from: source, to: target}) === null)  return 'snapback';
              else socket.emit('move', move);
            }}
        /> */}
        
        <ChessGame startFen={fen}/>
      </div>
    )
  }
}

const containerStyle = {
  margin: '1.1rem',
}

export default GameWindow