import React, { Component } from "react";
import LoginContent from "./LoginContent";
import RegisterContent from "./RegisterContent";
import { Card, CardBody } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class AuthWindow extends Component {
  state = {
    contentType: "REGISTER"
  };
  render() {
    const { contentType } = this.props;
    return (
      <Card body className="authCard" style={cardStyle}>
        {contentType === "LOGIN" && <LoginContent />}
        {contentType === "REGISTER" && <RegisterContent />}
      </Card>
    );
  }
}

const cardStyle = {
  //   borderColor: "#2c4967",
  //   background: "#28566b",
  //   background:
  //     "-webkit-linear-gradient(45.34deg, #28566b 5.66%, #9EADC8 94.35%)",
  //   background: "linear-gradient(45.34deg, #28566b 5.66%, #9EADC8 94.35%)",

  //   background: "#0F2027",
  //   background: "-webkit-linear-gradient(45deg, #0F2027 , #203A43,#2C5364)",
  //   background: "linear-gradient(45deg,  #203A43, #0F2027,#2C5364)",

  float: "none",
  marginTop: "2.5rem",
  padding: "10px 10px 10px 10px",
  boxShadow: "0 19px 18px",
  justifyContent: "center",
  fontSize: "1.3rem",
  maxWidth: "30rem",
  padding: "1rem"

  // align-items: center;
  // flexDirection: "row"
};

const mapStateToProps = state => ({
  contentType: state.auth.contentType
});

export default connect(mapStateToProps, {})(AuthWindow);
