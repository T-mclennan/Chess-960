import React, { Component } from "react";
import { Button, Card, CardText } from "reactstrap";
import Chessboard from "chessboardjsx";
import "../../css/Dashboard.css";

class GameCard extends Component {
  render() {
    return (
      <Card body outline color="secondary">
        <div className="cardBody">
          <Chessboard position={this.props.fen} width={200} draggable={false} />
          <CardText>{this.props.white}</CardText>
          <CardText>{this.props.black}</CardText>
        </div>
        {/* <CardTitle>Special Title Treatment</CardTitle> */}
      </Card>
    );
  }
}

export default GameCard;
