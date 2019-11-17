import React, { Component } from 'react'
import Chessboard from 'chessboardjsx'
import Chess from 'chess.js'
import io from 'socket.io-client'

class GameWindow extends Component {

  state = { 
            color: 'white',
            gameFen: "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R" 
          };

  render() {

    componentDidMount() {    
      socket.on('move', data => {
        this.setState({ data })
        game.move(data);
      })
    }

    var socket = io();
    var game = Chess();

    return (
      <container className="centered" style={containerStyle}>
        <Chessboard 
            position={this.state.gameFen}
            orientation={this.state.color}
            onDrop={(source, target) => {
              let move = game.move({from: source, to: target});
              if (game.move({from: source, to: target}) === null)  return 'snapback';
              else socket.emit('move', move);
            }}
        />
      </container>
    )
  }
}

const containerStyle = {
  margin: '1.1rem',
}

export default GameWindow