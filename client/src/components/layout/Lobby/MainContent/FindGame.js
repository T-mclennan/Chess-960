import React, { Component } from "react";
import "../../css/lobby.css";
import { connect } from "react-redux";
export class FindGame extends Component {
  render() {
    return (
      <div className="main container">
        <h3>Find Game!</h3>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player.username
});

export default connect(mapStateToProps, {})(FindGame);
