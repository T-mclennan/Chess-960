import React, { Component } from "react";
import "../../css/Dashboard.css";
import GameCard from "./GameCard";
import GameCardList from "./GameCardList";
import { connect } from "react-redux";
import Axios from "axios";
export class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <div className="headerContent">
          <h3>{this.props.player.username}'s current games: </h3>
        </div>
        {/* <div className="gameList "> */}
        <GameCardList />

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
