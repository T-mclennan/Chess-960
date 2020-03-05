import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import '../../css/lobby.css';

export class Standings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerArray: [],
    };
  }

  //In order to deal with asynchronous calls inside of map, we compose an array of Promises
  // and call Promise.all. The resulting array of games is saved into local state for further processing:
  componentDidMount() {
    this.generateStandings();
  }

  //Generates a list of open games, in which the player is not already present:
  generateStandings = () => {
    axios
      .get('api/players/getTopPlayers')
      .then(({ data }) => {
        this.setState({ playerArray: data });
        console.log(this.state.playerArray);
      })
      .catch(e => console.error(e));
  };

  renderResultRows(data) {
    return data.map((player, index) => {
      console.log(player);
      return (
        <tr>
          <td scope='row'>{index}</td>
          <td>{player.username}</td>
          <td>{player.rating}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className='main container'>
        <h2>Standings:</h2>
        <hr />
        <Table bordered responsive dark striped hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {this.state.playerArray.length > 0 ? (
              this.renderResultRows(this.state.playerArray)
            ) : (
              <tr>
                <th>empty</th>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player.username,
});

export default connect(mapStateToProps, {})(Standings);
