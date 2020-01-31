import React, { Component } from "react";
import {
  Button,
  CardBody,
  Form,
  FormGroup,
  Input,
  NavLink,
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import "../layout/css/AuthCard.css";
import history from "../../history";

class LoginContent extends Component {
  state = {
    modal: false,
    username: "",
    password: "",
    msg: null,
    reidrect: false,
    isAuthenticated: false
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
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
  }

  fadeMessage = () => {
    setTimeout(() => {
      this.props.clearErrors();
    }, 8000);
  };

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
    //If authenticated, redirect to lobby:
    // if (this.props.isAuthenticated) {
    //   console.log("is authenticated --");
    //   history.push("/lobby");
    // }

    return (
      <div>
        <CardBody>
          <Form onSubmit={this.onSubmit}>
            <FormGroup style={{ marginBottom: "0px" }}>
              {/* <Label for="name">Username</Label> */}
              <Input
                className="border border-info"
                maxLength={8}
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
                maxLength={20}
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

        {/* TODO: Style links for forgot password, Regester */}
        {/* <span style={{ display: "inline-block" }}>
          <Link
            style={{ margin: "2rem" }}
            href="#"
            onClick={() => this.props.setContent("REGISTER")}
          >
            Register Here!
          </Link>
          <Link style={{ margin: "2rem" }} href="/password-recovery">
            Forgot Password?
          </Link>
        </span> */}
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

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(LoginContent);
