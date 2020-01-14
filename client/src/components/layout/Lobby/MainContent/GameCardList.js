import React, { Component } from "react";
import GameCard from "./GameCard";
import "./Dashbord.css";

class GameCardList extends Component {
  render() {
    return (
      <section id="game-card-list">
        <ul style={{ fontSize: "18px" }}>
          {this.props.player.currentGames.map((gameID, i) => (
            //fetch game:

            <GameCard
              key={i}
              fen={data.fen}
              white={data.white}
              black={data.black}
              color={data.color}
            />
          ))}
        </ul>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player,
  game: state.game
});

export default connect(mapStateToProps, {})(GameCardList);
