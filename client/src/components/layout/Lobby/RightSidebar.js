import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
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
      <div className="rightsidebar">
        <div style={playerBox}>
          <div className="ui fluid container">
            <ul
              style={{
                listStyleType: "circle",
                lineHeight: "145%",

                fontSize: "21px"
              }}
            >
              {this.state.users.map((user, i) => (
                <li key={i}>{user.username}</li>
              ))}
            </ul>
          </div>
        </div>
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
  player: state.player
});

export default connect(mapStateToProps, {})(RightSidebar);
