import { Component } from "react";
import PropTypes from "prop-types";
import Chess from "chess.js";
import io from "socket.io-client";
import Axios from "axios";
import { connect } from "react-redux";
import {
  updateGame,
  updatePlayers,
  makeMove,
  changeTurn,
  setGameAsStarted
} from "../actions/gameActions";

const port = process.env.PORT || "http://127.0.0.1:5000";
const socket = io(port, { pingTimeout: 30000 });

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
      square: ""
    };
  }

  componentDidMount() {
    console.log("Inside Game Window");
    console.log(this.props.game);
    console.log(this.props.player);
    this.logic = new Chess();
    // this.loadGame();
    this.startGame();

    socket.on("newPlayer", data => {
      console.log("received newplayer ping.");
      if (data.gameID === this.props.gameID) {
        this.props.updatePlayers({
          white: data.white,
          black: data.black,
          started: data.started
        });
      }
    });

    socket.on("moveMade", data => {
      console.log("received newmove ping");
      if (data.gameID === this.props.gameID) {
        console.log("move made by opponent");
        this.logic.move(data.newMove);
        this.props.makeMove({
          fen: this.logic.fen(),
          history: this.logic.history({ verbose: true })
        });
        this.props.changeTurn();
        console.log(this.state);
      }
    });
  }

  //TODO: Save game in players profile:
  joinGame = () => {
    console.log("join game function:");
    const { gameID, white, black, started } = this.props.game;
    socket.emit("joined", {
      gameID,
      white,
      black,
      started
    });
    // this.props.addGameToProfile(this.props.gameID)
  };

  // loadGame : fetches the specified game, updates values in the redux store,
  //            sets the game logic to reflect the board state.
  loadGame = () => {
    console.log("Load Game");
    Axios.get(`/api/games/${this.props.gameID}`)
      .then(res => {
        this.props.updateGame(res.data);
      })
      .then(() => this.logic.load(this.props.fen))
      .then(() => {
        if (!this.props.started) this.joinGame();
      })
      .catch(e => console.log(e));
  };

  startGame = () => {
    const { fen, white, black, started } = this.props.game;
    console.log("Start Game");
    console.log(fen);
    this.logic.load(fen);

    if (white && black && !started) {
      this.setGameAsStarted();
      this.joinGame();
    }
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
    // see if the move is legal
    let move = this.logic.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q" // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return;
    console.log(this.logic.fen());
    socket.emit("move", { newMove: move, gameID: this.props.gameID });
    this.setState(({ history, pieceSquare }) => ({
      squareStyles: this.squareStyling({ pieceSquare, history })
    }));
    this.props.makeMove({
      fen: this.logic.fen(),
      history: this.logic.history({ verbose: true })
    });
    this.props.changeTurn();
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
      socket.emit("move", {
        move: move,
        fen: this.logic.fen(),
        gameID: this.props.gameID
      });
    }

    this.setState({
      // fen: this.logic.fen(),
      // history: this.logic.history({ verbose: true }),
      pieceSquare: ""
    });
    this.props.makeMove({
      fen: this.logic.fen(),
      history: this.logic.history({ verbose: true })
    });
    this.props.changeTurn();
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
    const { dropSquareStyle, squareStyles } = this.state;
    const { fen, color, turn, started, whiteName, blackName } = this.props;

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

//Setting Prop Types for the Game component:

const mapStateToProps = state =>
  // const {black, white} = state.game;
  // ({
  //   black: state.game.black,
  //   white: state.game.white,
  //   started: state.game.started,
  //   name: state.player.playerName,
  //   color: state.game.color,
  //   gameID: state.game.gameID,
  //   fen: state.game.fen,
  //   history: state.game.history,
  //   turn: state.game.turn
  // });
  ({
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
