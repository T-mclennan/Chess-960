import React, { Component } from "react";
import { connect } from "react-redux";
import Dashboard from "./MainContent/Dashboard";
import FindGame from "./MainContent/FindGame";
import NewGame from "./MainContent/NewGame";
import Standings from "./MainContent/Standings";
import { Container } from "reactstrap";
import "../css/lobby.css";

export class MainDisplay extends Component {
  render() {
    const { contentType } = this.props;
    return (
      <Container className="mainContainer">
        {contentType === "DASHBOARD" && <Dashboard />}
        {contentType === "NEWGAME" && <NewGame />}
        {contentType === "FINDGAME" && <FindGame />}
        {contentType === "STANDINGS" && <Standings />}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  contentType: state.auth.mainContent
});

export default connect(mapStateToProps, {})(MainDisplay);
