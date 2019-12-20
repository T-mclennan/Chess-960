import React, { Component } from "react";
import {
  Button,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { login, setContent } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import "../layout/css/AuthCard.css";

class LoginContent extends Component {
  state = {
    modal: false,
    username: "",
    password: "",
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    setContent: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
        this.fadeMessage();
      } else {
        this.setState({ msg: null });
      }
    }

    //If authenticated, redirect to lobby:
    if (this.props.isAuthenticated) {
      this.props.history.push("/path");
      this.props.setContent("LOGIN");
    }
  }

  fadeMessage = () => {
    setTimeout(() => {
      this.props.clearErrors();
    }, 8000);
  };

  // toggle = () => {
  //   this.props.clearErrors();
  //   this.setState({
  //     modal: !this.state.modal
  //   });
  // };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { username, password } = this.state;
    const player = {
      username,
      password
    };

    //Attempt to log in:
    this.props.login(player);
  };

  render() {
    return (
      <div>
        <CardBody>
          <Form onSubmit={this.onSubmit}>
            <FormGroup
              style={{ marginBottom: "0px" }}
              // className="input_form"
            >
              {/* <Label for="name">Username</Label> */}
              <Input
                className="border border-info"
                autoFocus={true}
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                className="mb-3"
                onChange={this.onChange}
              />

              {/* <Label for="password">Password</Label> */}
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={this.onChange}
              />
              <Button style={buttonStyle} block>
                Log In
              </Button>
            </FormGroup>
          </Form>
          {this.state.msg ? (
            <Alert
              style={{
                marginTop: "1rem",
                marginBottom: "0px",
                fontSize: "1rem",
                textAlign: "center"
              }}
              color={"danger"}
            >
              {this.state.msg}
            </Alert>
          ) : null}
        </CardBody>

        {/* Todo: Add links for forgot password, Regester */}
        {/* <CardBody>
          <Button color="link">forgot password?</Button>
          <Button color="link">Register Now!</Button>
        </CardBody> */}
      </div>
    );
  }
}
const buttonStyle = {
  // marginTop: "2rem",

  //deep:
  // background: "#43C6AC",
  // background: "-webkit-linear-gradient(45deg, #191654, #43C6AC)",
  // background: "linear-gradient(45deg, #191654, #43C6AC)",

  //metalic:
  background: "#0F2027",
  background: "-webkit-linear-gradient(45deg, #0F2027 , #203A43,#2C5364)",
  background: "linear-gradient(45deg,  #203A43, #0F2027,#2C5364)",

  padding: "0.5rem",
  marginTop: "1.5rem",
  fontSize: "1.3rem",
  borderWidth: "1px",
  boxShadow: "0 1px 0.5px",
  fontWeight: "bold"
  // borderColor: "black"
  // boxShadow: "0 19px 18px"
};

const headerStyle = {
  display: "flex",
  justifyContent: "center"
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors, setContent })(
  LoginContent
);
