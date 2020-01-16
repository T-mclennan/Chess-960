/* TODO: This will be a component for displaying player information:
 */

import React, { Component } from "react";
import whitePawn from "../../../../assets/images/wP.png";
import { connect } from "react-redux";

export class WhiteDetails extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     borderColor: "silver"
  //   };
  // }

  render() {
    // console.log("WHITE");
    // console.log(this.props.game);
    // const { borderColor } = this.state;
    const pawn = {
      //   webkitFilter: `drop-shadow(1px 1px 0 ${borderColor}) drop-shadow(-1px -1px 0 ${borderColor})`,
      //   filter: `drop-shadow(1px 1px 0 ${borderColor}) drop-shadow(-1px -1px 0 ${borderColor})`
    };

    return (
      <div className="playerDetails">
        <div className="clock"></div>
        <div className="peice">
          {" "}
          <img class="cover" style={pawn} src={whitePawn} />
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

export default connect(mapStateToProps, {})(WhiteDetails);
