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
      index++;
      return (
        <tr>
          <th scope='row'>{index}</th>
          <td>{player.username}</td>
          <td>{player.rating}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className='main container' style={standingsContainer}>
        <h2>Top Players:</h2>
        <hr />
        <Table className='standings' bordered responsive dark striped>
          <thead>
            <tr
              style={{
                backgroundColor: 'black',
                textAlign: 'center',
              }}
            >
              <th style={{ width: '4rem' }}>#</th>
              <th style={{ width: '15rem' }}>Username</th>
              <th style={{ width: '15rem' }}>Rating</th>
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

const standingsContainer = {
  padding: '1.5rem 5rem',
};

const mapStateToProps = state => ({
  player: state.player.username,
});

export default connect(mapStateToProps, {})(Standings);
