import { Component } from "react";
import PropTypes from "prop-types";
import Chess from "chess.js";
// import io from "socket.io-client";
import Axios from "axios";
import { connect } from "react-redux";
import {
  updateGame,
  updatePlayers,
  makeMove,
  changeTurn,
  setGameAsStarted
} from "../actions/gameActions";

// const port = process.env.PORT || "http://127.0.0.1:5000";
// const socket = io(port, { pingTimeout: 30000 });

class HumanVsHuman extends Component {
  static propTypes = {
    children: PropTypes.func,
    getGame: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      history: [],
      // square styles for active drop square:
      dropSquareStyle: {},
      // custom square styles:
      squareStyles: {},
      // square with the currently clicked piece:
      pieceSquare: "",
      // currently clicked square:
      square: "",
      fen: "",
      wTime: "",
      bTime: "",
      status: ""
    };
  }

  componentDidMount() {
    console.log("Game Comp Did Mount:");
    const { socket } = this.props;
    this.logic = new Chess(this.props.game.fen);

    console.log(this.props.game);
    this.loadToState();
    console.log(this.state);
    this.joinGame();

    socket.on("newPlayer", data => {
      console.log("received newplayer ping.");
      console.log(data);
      if (data.gameID === this.props.game.gameID) {
        console.log("updating players:");
        this.props.updatePlayers({
          white: data.white,
          black: data.black,
          started: data.started
        });
      }
    });

    socket.on("moveMade", data => {
      console.log("received newmove ping");
      console.log(data);
      if (data.gameID === this.props.game.gameID) {
        this.logic.move(data.newMove);
        this.setState({ fen: this.logic.fen() });
        this.props.makeMove({
          gameID: this.props.game.gameID,
          fen: this.logic.fen(),
          history: this.logic.history({ verbose: true }),
          wTime: this.state.wTime,
          bTime: this.state.bTime,
          turn: this.findNextTurn()
        });
      }
    });
  }

  loadToState = () => {
    const { fen, wTime, bTime } = this.props.game;
    this.setState({
      fen,
      wTime,
      bTime
    });
    console.log("state set");
  };

  checkGameStatus = () => {
    //Checks for checkmate, check, draw

    // checkmate?
    if (this.logic.in_checkmate() === true) {
      this.setState({ status: "checkmate" });
      console.log("Game Over, Checkmate!!");
    }

    // draw?
    else if (this.logic.in_draw() === true) {
      this.setState({ status: "draw" });
      console.log("Game Over, Draw!!");

      // check?
    } else if (this.logic.in_check() === true) {
      this.setState({ status: "check" });
      console.log("Game Over, Draw!!");
    }
  };

  findNextTurn = () => {
    const turn = this.props.game.turn;
    const nextTurn = turn === "white" ? "black" : "white";
    return nextTurn;
  };

  //TODO: Save game in players profile:
  joinGame = () => {
    const { gameID, white, black, started } = this.props.game;

    if (white && black && !started) {
      // this.setState({ started: true });

      Axios.get(`/api/games/startGame/${this.props.game.gameID}`)
        .then(() => {
          this.props.setGameAsStarted();
        })
        .catch(e => console.log(e));
    }

    console.log("joinGame()");
    this.props.socket.emit("joined", {
      gameID,
      white,
      black,
      started
    });
  };

  // keep clicked square style and remove hint squares
  removeHighlightSquare = () => {
    this.setState(({ pieceSquare, history }) => ({
      squareStyles: this.squareStyling({ pieceSquare, history })
    }));
  };

  // show possible moves
  highlightSquare = (sourceSquare, squaresToHighlight) => {
    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
      (a, c) => {
        return {
          ...a,
          ...{
            [c]: {
              background: "radial-gradient(circle, #ff8c69 7%, transparent 5%)",
              borderRadius: "15%"
            }
          },
          ...this.squareStyling({
            history: this.state.history,
            pieceSquare: this.state.pieceSquare
          })
        };
      },
      {}
    );

    this.setState(({ squareStyles }) => ({
      squareStyles: { ...squareStyles, ...highlightStyles }
    }));
  };

  onDrop = ({ sourceSquare, targetSquare }) => {
    const { socket } = this.props;
    // see if the move is legal
    let move = this.logic.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q" // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return;
    console.log(this.logic.fen());
    socket.emit("move", { newMove: move, gameID: this.props.game.gameID });
    this.setState(({ history, pieceSquare }) => ({
      squareStyles: this.squareStyling({ pieceSquare, history })
    }));

    this.setState({ fen: this.logic.fen() });
    this.props.makeMove({
      gameID: this.props.game.gameID,
      fen: this.logic.fen(),
      history: this.logic.history({ verbose: true }),
      wTime: this.state.wTime,
      bTime: this.state.bTime,
      turn: this.findNextTurn()
    });
  };

  onMouseOverSquare = square => {
    // get list of possible moves for this square
    let moves = this.logic.moves({
      square: square,
      verbose: true
    });

    // exit if there are no moves available for this square
    if (moves.length === 0) return;

    let squaresToHighlight = [];
    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }

    this.highlightSquare(square, squaresToHighlight);
  };

  onMouseOutSquare = square => this.removeHighlightSquare(square);

  // central squares get diff dropSquareStyles
  onDragOverSquare = square => {
    // this.setState({
    //   dropSquareStyle:
    //     square === "e4" || square === "d4" || square === "e5" || square === "d5"
    //       ? { backgroundColor: "cornFlowerBlue" }
    //       : { boxShadow: "inset 0 0 1px 4px #00d0ff" }
    // });
  };

  onSquareClick = square => {
    this.setState(({ history }) => ({
      squareStyles: this.squareStyling({ pieceSquare: square, history }),
      pieceSquare: square
    }));

    let move = this.logic.move({
      from: this.state.pieceSquare,
      to: square,
      promotion: "q" // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return;
    else {
      this.setState({ fen: this.logic.fen() });
      this.props.makeMove({
        gameID: this.props.game.gameID,
        fen: this.logic.fen(),
        history: this.logic.history({ verbose: true }),
        wTime: this.state.wTime,
        bTime: this.state.bTime,
        turn: this.findNextTurn()
      });

      this.props.socket.emit("move", {
        move: move,
        fen: this.logic.fen(),
        gameID: this.props.game.gameID
      });
    }

    this.setState({
      // fen: this.logic.fen(),
      // history: this.logic.history({ verbose: true }),
      pieceSquare: ""
    });
  };

  onSquareRightClick = square =>
    this.setState({
      squareStyles: { [square]: { backgroundColor: "deepPink" } }
    });

  squareStyling = ({ pieceSquare, history }) => {
    const sourceSquare = history.length && history[history.length - 1].from;
    const targetSquare = history.length && history[history.length - 1].to;

    return {
      // #00d0ff
      [pieceSquare]: { backgroundColor: "" },
      ...(history.length && {
        [sourceSquare]: {
          backgroundColor: ""
        }
      }),
      ...(history.length && {
        [targetSquare]: {
          backgroundColor: ""
        }
      })
    };
  };

  render() {
    const { dropSquareStyle, squareStyles, fen } = this.state;
    const { color, turn, started } = this.props.game;

    return this.props.children({
      draggable: turn === color && started === true,
      orientation: color,
      squareStyles,
      position: fen,
      onMouseOverSquare: this.onMouseOverSquare,
      onMouseOutSquare: this.onMouseOutSquare,
      onDrop: this.onDrop,
      dropSquareStyle,
      onDragOverSquare: this.onDragOverSquare,
      onSquareClick: this.onSquareClick,
      onSquareRightClick: this.onSquareRightClick
    });
  }
}

const mapStateToProps = state => ({
  game: state.game,
  player: state.player
});

export default connect(mapStateToProps, {
  updateGame,
  updatePlayers,
  makeMove,
  changeTurn,
  setGameAsStarted
})(HumanVsHuman);
