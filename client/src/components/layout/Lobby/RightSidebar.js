import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateUserlist } from "../../../actions/authActions";
import PlayerList from "./RightSidebar/PlayerList";
import OnlinePlayerList from "./RightSidebar/OnlinePlayerList";
import "../css/lobby.css";

// import "../../../src/App.css";

export class RightSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      onlineUsers: []
    };
  }

  componentDidMount() {
    const { socket } = this.props;
    this.getUsers();
    setTimeout(() => {
      this.connectSocket();
    }, 500);

    socket.on("updateUsers", userList => {
      console.log("received update Userlist ping.");
      console.log(userList);
      this.props.updateUserlist(userList);
      this.setState({ onlineUsers: userList });
    });
  }

  connectSocket = () => {
    const { socket } = this.props;
    console.log("Right Sidebar:");
    console.log(this.props);
    if (this.props.player.username) {
      socket.emit("sendUsername", this.props.player.username);
    }

    // socket.on("updateUsers", userList => {
    //   console.log("received update Userlist ping.");
    //   console.log(userList);
    // });
  };

  getUsers() {
    axios.get("/api/players/all").then(({ data }) => {
      console.log("GET USERS");
      console.log(data);

      this.setState({
        users: data
      });
    });
  }

  render() {
    return (
      <div>
        <OnlinePlayerList users={this.state.onlineUsers} />
        <PlayerList users={this.state.users} />
      </div>
    );
  }
}
const playerBox = {
  margin: "1px",
  width: "7rem",
  padding: "0 1rem"
  // border: "1px solid #585858",
  // backgroundColor: "#707070"
};

const mapStateToProps = state => ({
  player: state.player,
  auth: state.auth
});

export default connect(mapStateToProps, { updateUserlist })(RightSidebar);