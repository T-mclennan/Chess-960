/* TODO: This will be a component for displaying player information
// for the black player:
*/

import React, { Component } from 'react';
import blackPawn from '../../../../assets/images/bP.png';
import { connect } from 'react-redux';

export class BlackDetails extends Component {
  render() {
    const { turn, color } = this.props.game;
    const borderColor = color === turn ? '#ffd5d3' : 'silver';
    const pawn = {
      WebkitFilter: `drop-shadow(1px 1px 0 ${borderColor}) drop-shadow(-1px -1px 0 ${borderColor})`,
      filter: `drop-shadow(1px 1px 0 ${borderColor}) drop-shadow(-1px -1px 0 ${borderColor})`,
    };

    return (
      <div className='playerDetails'>
        <div className='clock'></div>
        <div className='peice'>
          <img className='cover' style={pawn} src={blackPawn} alt={''} />
        </div>
        <div className='infoBox'>
          <h2>
            {' '}
            {this.props.game.black ? (
              this.props.game.black
            ) : (
              <div className='emptyStyling'>Waiting for opponent</div>
            )}
          </h2>
          {/* <h3>{this.props.rating}</h3> */}
          {this.props.game.black ? <h5 style={{}}>1600</h5> : <div />}
        </div>
        {/* <header>{this.props.name}</header> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game,
});

export default connect(mapStateToProps, {})(BlackDetails);
