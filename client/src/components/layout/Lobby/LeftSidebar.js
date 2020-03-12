import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { setMainContent } from '../../../actions/authActions';
import { quickPlay } from '../../../actions/gameActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faListOl,
  faSearch,
  faChessBoard,
} from '@fortawesome/free-solid-svg-icons';
import { faPlayCircle, faUser } from '@fortawesome/free-regular-svg-icons';
import '../css/lobby.css';

export class LeftSidebar extends Component {
  setContent = content => {
    this.props.setMainContent(content);
  };

  render() {
    return (
      <div className='leftsidebar'>
        <Button
          style={sidebarButton}
          onClick={() => this.setContent('DASHBOARD')}
        >
          <FontAwesomeIcon
            icon={faUser}
            className='icon far fa-2x fa-in'
            size='2x'
          />
          <div className='iconTitle'> Dashboard</div>
        </Button>

        <Button
          style={sidebarButton}
          onClick={() => this.props.quickPlay(this.props.player.username)}
        >
          <FontAwesomeIcon
            icon={faPlayCircle}
            className='icon far fa-2x fa-in'
            size='2x'
          />
          <div className='iconTitle'>Quickplay</div>
        </Button>

        <Button
          style={sidebarButton}
          onClick={() => this.setContent('NEWGAME')}
        >
          <FontAwesomeIcon
            icon={faChessBoard}
            className='icon far fa-2x fa-in'
            size='2x'
          />
          <div className='iconTitle'>New Game</div>
        </Button>

        <Button
          style={sidebarButton}
          onClick={() => this.setContent('FINDGAME')}
        >
          <FontAwesomeIcon
            icon={faSearch}
            className='icon far fa-2x fa-in'
            size='2x'
          />
          <div className='iconTitle'>Find Game</div>
        </Button>

        <Button
          style={sidebarButton}
          onClick={() => this.setContent('STANDINGS')}
        >
          <FontAwesomeIcon
            icon={faListOl}
            className='icon far fa-2x fa-in'
            size='2x'
          />
          <div className='iconTitle'>Scoreboard</div>
        </Button>
      </div>
    );
  }
}

const sidebarButton = {
  color: '#707070',
  display: 'flex',
  flexDirection: 'column',
  // justifyContent: "center",
  alignItems: 'center',
  backgroundColor: 'black',
  padding: '1rem 0',
  width: '6rem',
  margin: 'auto',
  borderColor: 'black',
};

const mapStateToProps = state => ({
  auth: state.auth,
  player: state.player,
});

export default connect(mapStateToProps, {
  setMainContent,
  quickPlay,
})(LeftSidebar);
