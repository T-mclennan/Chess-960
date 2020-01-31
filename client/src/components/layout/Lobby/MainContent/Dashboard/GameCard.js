import React, { Component } from "react";
import { Card } from "reactstrap";
import Chessboard from "chessboardjsx";
import { connect } from "react-redux";
import { setMainContent } from "../../../../../actions/authActions";
import { loadGame, loadColor } from "../../../../../actions/gameActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import "../../../css/Dashboard.css";

class GameCard extends Component {
  constructor() {
    super();
    this.state = {
      gameID: ""
    };

    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    // console.log(this.state.gameID);
    await this.props.loadGame(this.props.gameID, this.props.username);
    console.log("Game Loaded");
  }

  render() {
    return (
      <a className="cardWrapper" onClick={this.handleClick}>
        <Card
          body
          outline
          color="secondary"
          style={cardStyle}
          // onClick={() => this.props.setMainContent("GAME")}
        >
          <div className="cardBody">
            <Chessboard
              position={this.props.fen}
              width={200}
              draggable={false}
              orientation={this.props.color}
            />
            <div className="playerTitle">
              <span>
                <FontAwesomeIcon
                  icon={faCircle}
                  size="xs"
                  style={{ marginRight: "0.3rem" }}
                />
                {this.props.white ? (
                  this.props.white
                ) : (
                  <span className="openStyling">Open</span>
                )}
              </span>
              <span>
                <FontAwesomeIcon
                  icon={faCircle}
                  size="xs"
                  style={{
                    //   marginLeft: "0.5rem",
                    marginRight: "0.3rem",
                    color: "black"
                  }}
                />
                {this.props.black ? (
                  this.props.black
                ) : (
                  <span className="openStyling">Open</span>
                )}
              </span>
            </div>
          </div>
          {/* <CardTitle>Special Title Treatment</CardTitle> */}
        </Card>
      </a>
    );
  }
}

{
  /* <i class="far fa-circle"></i> */
}

const cardStyle = {
  backgroundColor: "darkgrey",
  margin: "0.6rem",
  flex: "0 22% ",
  minWidth: "13.5rem",
  padding: "0.4rem",
  marginBottom: "2.5rem"
  /* flex: 0 1 calc(25% - 1em) !important; */
};

const mapStateToProps = state => ({
  // player: state.player
});

export default connect(mapStateToProps, {
  setMainContent,
  loadGame,
  loadColor
})(GameCard);