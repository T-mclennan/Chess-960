import React, { Component } from "react";
import "../../css/lobby.css";
import { Button } from "reactstrap";
import { connect } from "react-redux";
export class Dashboard extends Component {
  render() {
    return (
      <div className="main container">
        <h3>Dashboard Component for {this.props.player}!</h3>
        <h3>Click here to quickplay:</h3>
        <div>
          <Button
            color="primary"
            size="lg"
            style={{ marginLeft: "1rem" }}
            onClick={{}}
          >
            Play Now!
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player.username
});

export default connect(mapStateToProps, {})(Dashboard);
