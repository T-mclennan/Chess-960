import React, { Component } from "react";
import { joinGame } from "../../../../actions/gameActions";
import { connect } from "react-redux";
import "../../css/Dashboard.css";

class TableEntry extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("inside click");
    console.log(this.props.game._id);
    this.props.joinGame(this.props.game._id, this.props.username);
  }

  render() {
    const { game, index } = this.props;
    return (
      // <a className="cardWrapper" onClick={this.handleClick}>
      <tr onClick={this.handleClick}>
        <td scope="row">{index}</td>
        <td>{game.black ? game.black : "open"}</td>
        <td>{game.white ? game.white : "open"}</td>
        <td>960</td>
        <td>No Time</td>
      </tr>
      // </a>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player
});

export default connect(mapStateToProps, { joinGame })(TableEntry);
