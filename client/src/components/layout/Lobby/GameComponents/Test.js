import React, { Component } from "react";
import { connect } from "react-redux";

export class Test extends Component {
  render() {
    console.log("WHITE.JS");
    console.log(this.props.game);
    return <div className="gameContainer">{this.props.game.white}</div>;
  }
}

const mapStateToProps = state => ({
  game: state.game
});

export default connect(mapStateToProps, {})(Test);
