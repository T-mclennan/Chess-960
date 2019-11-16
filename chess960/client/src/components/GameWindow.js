import React, { Component } from 'react'
import Chessboard from 'chessboardjsx'
export class GameWindow extends Component {
  render() {
    return (
      <container className="centered" style={containerStyle}>
        <Chessboard position="r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R" />
      </container>
    )
  }
}

const containerStyle = {
  margin: '1.1rem',
}

export default GameWindow
