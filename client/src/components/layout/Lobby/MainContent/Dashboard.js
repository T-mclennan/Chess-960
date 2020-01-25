// Dashboard is serves as the main viewport for the user when the are logged in:
import React, { Component } from "react";
import "../../css/Dashboard.css";
import GameCardList from "./GameCardList";
import { connect } from "react-redux";

export class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <div className="headerContent">
          <h3>{this.props.player.username}'s current games: </h3>
        </div>
        {/* <div className="gameList "> */}
        <GameCardList currentGames={this.props.player} />

        {/* </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player,
  game: state.game
});

export default connect(mapStateToProps, {})(Dashboard);
