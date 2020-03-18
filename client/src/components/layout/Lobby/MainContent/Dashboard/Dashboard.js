// Dashboard is serves as the main viewport for the user when the are logged in:
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { setMainContent } from '../../../../../actions/authActions';
import Welcome from './Welcome';
import GameCardList from './GameCardList';
import { connect } from 'react-redux';
import '../../../css/Dashboard.css';

export class Dashboard extends Component {
  render() {
    return (
      <div className='dashboard'>
        {this.props.player.username ? (
          this.props.player.currentGames.length > 0 ? (
            <GameCardList currentGames={this.props.player} />
          ) : (
            <Welcome username={this.props.player.username} />
          )
        ) : (
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            size='xs'
            style={{
              fontSize: '4rem',
              color: 'white',
              marginTop: '3rem',
            }}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player,
});

export default connect(mapStateToProps, { setMainContent })(Dashboard);
