import React, { Component } from "react";
import GameCard from "./GameCard";
import { connect } from "react-redux";
import axios from "axios";
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
    setTimeout(() => {
      console.log("Comp Did Mount!");
      console.log(this.props.player);
      this.generateGames();
    }, 300);
  }

  generateGames = () => {
    const { currentGames } = this.props.player;
    console.log("Generate Games current games:");
    console.log(currentGames);
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
      console.log("response");
      console.log(response);
      this.setState({ gameArray: response });
    });
  };

  render() {
    return (
      <section id="gameList">
        {this.state.gameArray.map((game, index) => {
          return (
            <GameCard
              key={index}
              white={game.data.white}
              black={game.data.black}
              fen={game.data.fen}
              gameID={game.data.id}
            />
          );
        })}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player,
  game: state.game
});

export default connect(mapStateToProps, {})(GameCardList);
