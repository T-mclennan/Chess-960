import React, { Component } from 'react';
import GameTable from './GameTable';
import { connect } from 'react-redux';
import '../../css/lobby.css';
export class FindGame extends Component {
  render() {
    return (
      <div className='main container'>
        <GameTable />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player.username,
});

export default connect(mapStateToProps, {})(FindGame);
