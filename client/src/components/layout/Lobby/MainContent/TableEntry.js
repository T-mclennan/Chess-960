import React, { Component } from "react";
import { loadGame } from "../../../../actions/gameActions";
import "../../css/Dashboard.css";

class TableEntry extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this.props.game);
    loadGame(this.props.game._id, this.props.username);
  }

  render() {
    const { game, index } = this.props;
    return (
      // <a className="cardWrapper" onClick={this.handleClick}>
      <tr onClick={this.handleClick}>
        <th scope="row">{index}</th>
        <td>{game.black ? game.black : "open"}</td>
        <td>{game.white ? game.white : "open"}</td>
        <td>960</td>
        <td>No Time</td>
      </tr>
      // </a>
    );
  }
}

export default TableEntry;
