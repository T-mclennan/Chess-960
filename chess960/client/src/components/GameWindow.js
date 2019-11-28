import React, { Component } from 'react'
import ChessGame from './ChessGame';
import NameInputForm from './NameInputForm'

class GameWindow extends Component {

  constructor(props) {
    super(props);

    this.state = {
       playerName: ''
    };
  }

  addName = (name) => {
    this.setState({playerName: name}, () => {
      console.log("name is: " + name + "playerName is: " + this.state.playerName)
    })}

  render() {

    return (
      
      <div className="centered" style={containerStyle}>
                    {/* <ChessGame user={this.state.playerName}/> */}
        {
          !this.state.playerName ?  
            <NameInputForm setUsername={this.addName}/> :
            <div> 
            {ChessGame(this.state.playerName)}
            </div>
        }
      </div>
    )
  }
}

const containerStyle = {
  margin: '1.1rem',
}

export default GameWindow