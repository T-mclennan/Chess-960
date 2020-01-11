import React, { Component } from "react";
import "../../css/Dashboard.css";
import GameCard from "./GameCard";
import { connect } from "react-redux";
export class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <div className="headerContent">
          <h3>Current games for {this.props.player.username}: </h3>
        </div>
        <div className="gameList ">
          <GameCard
            white={this.props.player.username}
            black={"Sammy"}
            fen={this.props.game.fen}
          />

          <GameCard
            white={this.props.player.username}
            black={"Sammy"}
            fen={this.props.game.fen}
          />

          <GameCard
            white={this.props.player.username}
            black={"Sammy"}
            fen={this.props.game.fen}
          />

          <GameCard
            white={this.props.player.username}
            black={"Sammy"}
            fen={this.props.game.fen}
          />

          <GameCard
            white={this.props.player.username}
            black={"Sammy"}
            fen={this.props.game.fen}
          />

          <GameCard
            white={this.props.player.username}
            black={"Sammy"}
            fen={this.props.game.fen}
          />

          <GameCard
            white={this.props.player.username}
            black={"Sammy"}
            fen={this.props.game.fen}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player,
  game: state.game
});

export default connect(mapStateToProps, {})(Dashboard);
