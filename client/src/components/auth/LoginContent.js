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
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

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
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    //If authenticated, close modal:
    if (!this.state.modal) {
      if (this.props.isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.username]: e.target.value });
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
        {/* <CardHeader style={headerStyle}>
          <h4>Log In</h4>
        </CardHeader> */}
        <CardBody>
          {this.state.msg ? (
            <Alert color={"danger"}>{this.state.msg}</Alert>
          ) : null}
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
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
        </CardBody>
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
  /* fallback for old browsers */
  background: "-webkit-linear-gradient(45deg, #0F2027 , #203A43,#2C5364)",
  /* Chrome 10-25, Safari 5.1-6 */
  background: "linear-gradient(45deg,  #203A43, #0F2027,#2C5364)",
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  padding: "0.5rem",
  marginTop: "1.5rem",
  fontSize: "1.3rem",
  borderWidth: "2px",
  boxShadow: "0 1px 0.5px",
  fontWeight: "bold"
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

export default connect(mapStateToProps, { login, clearErrors })(LoginContent);