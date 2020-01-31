import React, { Component } from "react";
import "../../css/lobby.css";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import PropTypes from "prop-types";
import { createGame } from "../../../../actions/gameActions";

export class NewGame extends Component {
  state = {
    color: "White",
    timer: "Unlimited",
    style: "960",
    scoring: "Unrated",
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

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { timer, style, scoring, color } = this.state;
    const { username } = this.props.player;
    //Create proto-game object:
    let newGame = {
      white: "",
      black: "",
      timer,
      style,
      scoring,
      color
    };

    //Set player to appropriate color:
    if (color === "White") {
      newGame.white = username;
    } else if (color === "Black") {
      newGame.black = username;
    } else console.log("Color selection error.");

    //Attempt to create game:
    this.props.createGame({ newGame, username });
  };

  render() {
    return (
      <div className="main container" style={{ scrollBehavior: "auto" }}>
        <h4>Please select from the following game options:</h4>
        <Form onSubmit={this.onSubmit}>
          <FormGroup style={{ marginTop: "1.8rem" }} className="dropdown">
            <Label for="color">Color</Label>
            <Input
              type="select"
              name="color"
              id="color"
              onChange={this.onChange}
            >
              <option>White</option>
              <option>Black</option>
            </Input>
            {/* </FormGroup> */}

            {/* <FormGroup> */}
            <Label for="timer">Timer</Label>
            <Input
              type="select"
              name="timer"
              id="timer"
              onChange={this.onChange}
            >
              <option>Unlimited</option>
              <option>1</option>
              <option>2</option>
              <option>5</option>
              <option>10</option>
              <option>20</option>
            </Input>
            {/* </FormGroup> */}

            {/* <FormGroup> */}
            <Label for="exampleSelect">Style</Label>
            <Input
              type="select"
              name="style"
              id="style"
              onChange={this.onChange}
            >
              <option>960</option>
              <option>Standard</option>
            </Input>
            {/* </FormGroup> */}

            {/* <FormGroup> */}
            <Label for="exampleSelect">Scoring</Label>
            <Input
              type="select"
              name="scoring"
              id="scoring"
              onChange={this.onChange}
            >
              <option>Unrated</option>
              <option>Rated</option>
            </Input>
            {/* </FormGroup> */}

            {/* <FormGroup row></FormGroup> */}
            {/* <FormGroup style={buttonGroup} row> */}
            <Button style={buttonStyle} block>
              Create Game
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
  player: state.player
});

export default connect(mapStateToProps, { createGame })(NewGame);
