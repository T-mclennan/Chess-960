import React, { Component } from 'react';
import GameTable from './GameTable';
import { connect } from 'react-redux';
import '../../css/lobby.css';
export class FindGame extends Component {
  render() {
    return (
      <div className='main container outer'>
        <h3>Click on a game below to join:</h3>
        {/* <hr /> */}
        <GameTable className='gameTable' />
      </div>
    );
  }
}

// const TableStyle = {
//   backGroundColor: "white",
//   borderColor: "white",
//   borderWidth: "1px"
// };

const mapStateToProps = state => ({
  player: state.player.username,
});

export default connect(mapStateToProps, {})(FindGame);
