/* TODO: This will be a component for displaying player information:
 */

import React, { Component } from 'react';
import whitePawn from '../../../../assets/images/wP.png';
import { connect } from 'react-redux';

export class WhiteDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: '',
    };
  }

  componentDidMount() {
    //TODO: Fetch Rating of white player from database, set into state
    //      Copy over to BlackDetails component
  }
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
          {' '}
          <img className='cover' style={pawn} src={whitePawn} alt={''} />
        </div>
        <div className='infoBox'>
          <h2>
            {this.props.game.white ? (
              this.props.game.white
            ) : (
              <div className='emptyStyling'>Waiting for opponent</div>
            )}
          </h2>
          {/* <h3>{this.props.rating}</h3> */}
          {this.props.game.white ? <h5>1600</h5> : <div />}
        </div>
        {/* <header>{this.props.name}</header> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game,
});

export default connect(mapStateToProps, {})(WhiteDetails);
