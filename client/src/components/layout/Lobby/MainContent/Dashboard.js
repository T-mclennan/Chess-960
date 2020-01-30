// Dashboard is serves as the main viewport for the user when the are logged in:
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import GameCardList from "./GameCardList";
import { connect } from "react-redux";
import "../../css/Dashboard.css";

export class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <div className="headerContent">
          <h3>{this.props.player.username}'s current games: </h3>
        </div>
        {/* <div className="gameList "> */}

        {this.props.player.currentGames.length > 0 ? (
          <GameCardList currentGames={this.props.player} />
        ) : (
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            size="xs"
            style={{
              fontSize: "4rem",
              color: "white"
            }}
          />
          //  <i class="fas fa-spinner fa-pulse"></i>
        )}

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
