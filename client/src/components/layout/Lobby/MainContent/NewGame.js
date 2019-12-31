import React, { Component } from "react";
import "../../css/lobby.css";
import { connect } from "react-redux";
import {
  Col,
  FormText,
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
import PropTypes from "prop-types";
import { clearErrors } from "../../../../actions/errorActions";
import history from "../../../../history";

export class NewGame extends Component {
  state = {
    color: "",
    timed: "",
    style: "",
    msg: null
  };

  static propTypes = {
    // error: PropTypes.object.isRequired,
    // clearErrors: PropTypes.func.isRequired,
  };

  // componentDidMount() {
  //   if (this.props.msg) {
  //     this.fadeMessage();
  //   }
  // }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "REGISTER_FAIL") {
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

  toggle = () => {
    this.props.clearErrors();
    this.setState({
      redirect: !this.state.redirect
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { username, email, password } = this.state;

    //Create user object:
    const newPlayer = {
      username,
      email,
      password
    };

    //Attempt to register:
    this.props.register(newPlayer);
  };

  render() {
    return (
      <div className="main container" style={{ scrollBehavior: "auto" }}>
        <h4>Please select from the following game options:</h4>
        <Form style={{ marginTop: "1.5rem" }}>
          <FormGroup className="dropdown">
            <Label for="exampleSelect">Color</Label>
            <Input type="select" name="select" id="exampleSelect">
              <option>White</option>
              <option>Black</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="exampleSelect">Time</Label>
            <Input type="select" name="select" id="exampleSelect">
              <option>None</option>
              <option>1</option>
              <option>2</option>
              <option>5</option>
              <option>10</option>
              <option>20</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="exampleSelect">Style</Label>
            <Input type="select" name="select" id="exampleSelect">
              <option>960</option>
              <option>Standard</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="exampleSelect">Select</Label>
            <Input type="select" name="select" id="exampleSelect">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>

          {/* <FormGroup row></FormGroup> */}
          <FormGroup style={buttonGroup} check row>
            <Button style={buttonStyle} block>
              Create Game
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
const buttonStyle = {
  //metalic:
  background: "#0F2027",
  background: "-webkit-linear-gradient(45deg, #0F2027 , #203A43,#2C5364)",
  background: "linear-gradient(45deg,  #203A43, #0F2027,#2C5364)",
  padding: "0.5rem",
  marginTop: "1.5rem",
  fontSize: "1.3rem",
  borderWidth: "2px",
  fontWeight: "bold",
  boxShadow: "0 1px 0.5px"
  // boxShadow: "0 19px 18px"
};

const buttonGroup = {
  paddingLeft: "0px",
  marginLeft: "0px",
  marginRight: "0px",
  marginTop: "2rem"
};

const mapStateToProps = state => ({
  player: state.player.username
});

export default connect(mapStateToProps, {})(NewGame);
