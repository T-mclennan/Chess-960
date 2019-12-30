import React, { Component } from "react";
import "../../css/lobby.css";
import { connect } from "react-redux";
export class Standings extends Component {
  render() {
    return (
      <div className="main container">
        <h3>Standings!</h3>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player.username
});

export default connect(mapStateToProps, {})(Standings);
