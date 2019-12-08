import React, { Component } from 'react'
import ChessGame from './ChessGame';
import NameInputForm from './NameInputForm'
import {connect} from 'react-redux';
import {updatePlayer} from '../actions/playerActions'
import {updateGame} from '../actions/gameActions'
import axios from 'axios'


/*  TODO: document GameWindow component
//  
*/
class GameWindow extends Component {

  constructor(props) {
    super(props);

    this.state = {
       playerName: '',
       gameID: '',
       color: '',
       fen: ''
    };
  }


  //Adds name and fetches new game:
  addName = (name) => {
    // console.log(name)
    axios.post('/api/games/findGameForPlayer', {username : name})
    .then((response) => {
      this.setState(
        {playerName: name, 
         gameID: response.data.gameID, 
         color: response.data.color, 
         fen: response.data.fen
        })
    })
    .catch(e => console.log(e));
  }

  render() {

    return (
      
      <div className="centered" style={containerStyle}>
        {
          !this.state.playerName ?  
            <NameInputForm setUsername={this.addName}/> :
            <div>{ChessGame(this.state.playerName, this.state.gameID, this.state.color, this.state.fen)}</div>
        }
      </div>
    )
  }
}

const containerStyle = {
  margin: '1.1rem',
}

const mapStateToProps = (state) => ({
   name: state.username,
   color: state.color

})

export default connect(mapStateToProps, {updatePlayer, updateGame})(GameWindow);