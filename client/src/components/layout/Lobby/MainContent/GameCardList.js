import React, { Component } from "react";
import GameCard from "./GameCard";
import { connect } from "react-redux";
import axios from "axios";
import { findColor } from "../../../../actions/gameActions";
import "../../css/Dashboard.css";

//use state to generate the games:

class GameCardList extends Component {
  constructor() {
    super();
    this.state = {
      gameArray: []
    };
  }

  //In order to deal with asynchronous calls inside of map, we compose an array of Promises
  // and call Promise.all. The resulting array of games is saved into local state for further processing:
  componentDidMount() {
    console.log("render MOUNT");
    console.log(this.props.currentGames);
    // this.setState({ gameArray: this.props.currentGames });
    setTimeout(() => {
      this.generateGames();
    }, 1000);
    console.log("gen");
    console.log(this.props.currentGames);
  }

  // shouldComponentUpdate(nextProps) {
  //   return nextProps.currentGames !== this.props.player.currentGames;
  // }

  componentWillReceiveProps(nextProps) {
    console.log("WillProps:");
    console.log(this.props);
    if (this.props.currentGames !== nextProps.currentGames) {
      this.generateGames();
    }
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
    return (
      <div className="gameList">
        {this.state.gameArray.map((game, index) => {
          console.log("GameList!");
          console.log(game.data);
          const color = findColor(game, this.props.player.username);

          return (
            <GameCard
              key={index}
              white={game.data.white}
              black={game.data.black}
              fen={game.data.fen}
              gameID={game.data._id}
              username={this.props.player.username}
              color={color}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player
  // game: state.game
});

export default connect(mapStateToProps, {})(GameCardList);
