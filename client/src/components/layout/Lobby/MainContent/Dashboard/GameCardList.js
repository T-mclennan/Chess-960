import React, { Component } from 'react';
import GameCard from './GameCard';
import { connect } from 'react-redux';
import axios from 'axios';
import { findColor } from '../../../../../actions/gameActions';
import '../../../css/Dashboard.css';

//use state to generate the games:

class GameCardList extends Component {
  constructor() {
    super();
    this.state = {
      gameArray: [],
    };
  }

  //In order to deal with asynchronous calls inside of map, we compose an array of Promises
  // and call Promise.all. The resulting array of games is saved into local state for further processing:
  componentDidMount() {
    this.generateGames();
  }

  generateGames = () => {
    const { currentGames } = this.props.player;
    Promise.all(
      currentGames.map(gameID => {
        return axios
          .get(`/api/games/${gameID}`)
          .then(a => {
            return a; // Returns the particular game.
          })
          .catch(e => console.error(e));
      })
    ).then(response => {
      this.setState({ gameArray: response });
    });
  };

  render() {
    let styling = this.state.gameArray.length > 3 ? '"flexStart"' : '"center"';
    return (
      // <div className="dashHeader">
      <div className='dashHeader'>
        <h3 style={{ margin: '0.9rem', textAlign: 'center' }}>
          {this.props.player.username}'s current games:{' '}
        </h3>

        <div className='gameList' style={{ justifyContent: styling }}>
          {this.state.gameArray.map((game, index) => {
            const color = findColor(game, this.props.player.username);

            return (
              // <div className="dashboard">
              <GameCard
                key={index}
                white={game.data.white}
                black={game.data.black}
                fen={game.data.fen}
                gameID={game.data._id}
                username={this.props.player.username}
                color={color}
              />
              // </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player,
  // game: state.game
});

export default connect(mapStateToProps, {})(GameCardList);
