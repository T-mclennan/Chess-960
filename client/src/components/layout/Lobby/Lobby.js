import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../css/lobby.css";
import LeftSidebar from "./LeftSidebar";
import MainDisplay from "./MainDisplay";
import RightSidebar from "./RightSidebar";
import { connect } from "react-redux";
// import "../../../src/App.css";

export class Lobby extends Component {
  render() {
    return (
      <div className="content">
        <LeftSidebar />
        <MainDisplay player={this.props.player.username} />
        <RightSidebar />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  player: state.player,
  error: state.error
});

export default connect(mapStateToProps, {})(Lobby);
