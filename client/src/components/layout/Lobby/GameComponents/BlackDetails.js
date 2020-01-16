/* TODO: This will be a component for displaying player information:
 */

import React, { Component } from "react";
import blackPawn from "../../../../assets/images/bP.png";
import { connect } from "react-redux";

export class BlackDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      borderColor: "silver"
    };
  }

  render() {
    console.log("black details: game:");
    console.log(this.props);
    const { borderColor } = this.state;
    const pawn = {
      webkitFilter: `drop-shadow(1px 1px 0 ${borderColor}) drop-shadow(-1px -1px 0 ${borderColor})`,
      filter: `drop-shadow(1px 1px 0 ${borderColor}) drop-shadow(-1px -1px 0 ${borderColor})`
    };

    return (
      <div className="playerDetails">
        <div className="clock"></div>
        <div className="peice">
          <img class="cover" style={pawn} src={blackPawn} />
        </div>
        <div className="infoBox">
          <h2>{this.props.player}</h2>
          <h3>{this.props.rating}</h3>
        </div>
        {/* <header>{this.props.name}</header> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game
});

export default connect(mapStateToProps, {})(BlackDetails);
