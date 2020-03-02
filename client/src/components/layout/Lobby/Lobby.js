import React, { Component } from 'react';
import '../css/lobby.css';
import LeftSidebar from './LeftSidebar';
import MainDisplay from './MainDisplay';
import RightSidebar from './RightSidebar/RightSidebar';
import { connect } from 'react-redux';
import { clearState } from '../../../actions/authActions';
import SocketContext from './../../../socket-context';
// import "../../../src/App.css";

export class Lobby extends Component {
  componentWillUnmount() {
    this.props.clearState();
  }

  render() {
    return (
      <div className='content'>
        <LeftSidebar />
        <MainDisplay player={this.props.player.username} />
        <SocketContext.Consumer>
          {socket => <RightSidebar socket={socket} />}
        </SocketContext.Consumer>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  player: state.player,
  error: state.error,
});

export default connect(mapStateToProps, { clearState })(Lobby);
