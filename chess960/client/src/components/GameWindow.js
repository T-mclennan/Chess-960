import React, { Component } from 'react'
import ChessGame from './ChessGame';
import NameInputForm from './NameInputForm'
import io from 'socket.io-client';
import axios from 'axios'


/*  TODO: document GameWindow component
//  parts to add: 
//      get player  api call: returns: player object 
//      get game    api call: returns: color, gameID -> adds game to player gameList
//      get color
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
    console.log(name)
    axios.post('/api/games/findGameForPlayer', {username : name})
    .then((response) => {
      console.log(response)
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

// GameWindow.propTypes = {
//   addPlayer: PropTypes.func.isRequired,
//   updateGame: PropTypes.object.isRequired
// }

// const mapStateToProps = (state) => ({
//   game: state.game,
//   player: state.player
// })

// export default connect(mapStateToProps, {addPlayer, updateGame})(GameWindow);
export default GameWindow;