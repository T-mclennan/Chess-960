import React, { Component } from 'react'
import io from 'socket.io-client'
import ChessGame from './ChessGame';

class GameWindow extends Component {


  render() {

    // const board = new boardGeneration()
    // const fen = board.generateBoard()
    // console.log("pre-pass fen is: "+fen)

    // var game = Chess(this.state.gameFen);

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
        
        <ChessGame/>
      </div>
    )
  }
}

const containerStyle = {
  margin: '1.1rem',
}

export default GameWindow