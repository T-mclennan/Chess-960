import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Table } from "reactstrap";
import TableEntry from "./TableEntry";
// import { joinGame } from "../../../../actions/gameActions";

import "../../css/Dashboard.css";

class GameTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameArray: []
    };
  }

  //In order to deal with asynchronous calls inside of map, we compose an array of Promises
  // and call Promise.all. The resulting array of games is saved into local state for further processing:
  componentDidMount() {
    this.generateGames();
  }

  generateGames = () => {
    axios
      .get("api/games/")
      .then(gameList => {
        this.setState({ gameArray: gameList.data });
      })
      .catch(e => console.error(e));
  };

  fetchSongDetails = () => {};

  renderResultRows(data) {
    console.log("inside Results Row");
    return data.map((game, index) => {
      return (
        <TableEntry
          username={this.props.player.username}
          game={game}
          key={index}
        />
      );
    });
  }

  render() {
    return (
      <Table bordered responsive dark striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>White</th>
            <th>Black</th>
            <th>Style</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {this.state.gameArray.length > 0 ? (
            this.renderResultRows(this.state.gameArray)
          ) : (
            <tr>
              <th>empty</th>
            </tr>
          )}
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player
});

export default connect(mapStateToProps, {})(GameTable);
