import React, { Component } from "react";
import { Container } from "reactstrap";
import chessPicture from "../../assets/images/puzzle_2x.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEmpire } from "@fortawesome/free-brands-svg-icons";
export class FourOhFour extends Component {
  render() {
    return (
      <Container style={pageStyle}>
        <h2 style={{ margin: "1.7rem" }}>Oh snap! That page doesn't exist!</h2>

        {/* <FontAwesomeIcon
          icon={faEmpire}
          spin
          size="large"
          style={{
            fontSize: "12rem",
            color: "#B4D5FA",
            marginTop: "5rem"
          }}
        /> */}
        <div className="picture">
          <img
            className="cover"
            src={chessPicture}
            style={{ width: "20rem" }}
          />
        </div>
      </Container>
    );
  }
}

const pageStyle = {
  dislay: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  color: "white"
};

export default FourOhFour;
