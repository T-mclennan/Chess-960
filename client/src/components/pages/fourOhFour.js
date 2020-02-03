import React, { Component } from "react";
import { Container } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEmpire } from "@fortawesome/free-brands-svg-icons";
export class FourOhFour extends Component {
  render() {
    return (
      <Container style={pageStyle}>
        <h1>Oh snap! The page you're looking for doesn't exist!</h1>

        <FontAwesomeIcon
          icon={faEmpire}
          spin
          size="large"
          style={{
            fontSize: "12rem",
            color: "#B4D5FA",
            marginTop: "5rem"
          }}
        />
      </Container>
    );
  }
}

{
  /* <i class="fab fa-empire"></i> */
}

const pageStyle = {
  dislay: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  margin: "2rem",
  color: "white"
};

export default FourOhFour;
