import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUserlist } from '../../../../actions/authActions';
import PlayerList from './PlayerList';
import OnlinePlayerList from './OnlinePlayerList';
import '../../css/RightSidebar.css';

export class RightSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      onlineUsers: [],
      isMounted: true,
    };
  }

  componentDidMount() {
    const { socket } = this.props;
    this.getUsers();
    setTimeout(() => {
      this.connectSocket();
    }, 500);

    socket.on('updateUsers', (userList) => {
      // console.log("received update Userlist ping.");
      // console.log(userList);
      if (this.state.isMounted) {
        this.props.updateUserlist(userList);
        this.setState({ onlineUsers: userList });
      }
    });
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
  }

  connectSocket = () => {
    const { socket } = this.props;
    if (socket && this.props.player.username) {
      socket.emit('sendUsername', this.props.player.username);
    }
  };

  getUsers() {
    axios.get('/api/players/all').then(({ data }) => {
      // console.log("GET USERS");
      // console.log(data);

      this.setState({
        users: data,
      });
    });
  }

  render() {
    return (
      // <div className="ui fluid container">
      <div className='rightsidebar '>
        <div style={playerBox}>
          <OnlinePlayerList users={this.state.onlineUsers} />
          <PlayerList
            users={this.state.users}
            onlineUsers={this.state.onlineUsers}
          />
        </div>
      </div>
    );
  }
}
const playerBox = {
  minWidth: '7rem',
  overflow: 'hidden',
};

const mapStateToProps = (state) => ({
  player: state.player,
  auth: state.auth,
});

export default connect(mapStateToProps, { updateUserlist })(RightSidebar);
