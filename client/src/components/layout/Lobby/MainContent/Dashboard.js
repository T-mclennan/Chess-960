import React, { Component } from "react";
import "../../css/lobby.css";
import { Button } from "reactstrap";
export class Dashboard extends Component {
  render() {
    return (
      <div className="main container">
        <h2>Welcome {this.props.player}!</h2>
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

export default Dashboard;
