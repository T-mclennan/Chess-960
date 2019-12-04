import React, { Component } from "react";
import PropTypes from "prop-types";
import  Chess  from "chess.js"; 
import Chessboard from "chessboardjsx";
import io from 'socket.io-client';
import Axios from "axios";
// import {connect} from 'react-redux'
// import {GET_GAME} from '../actions/gameActions'
const port = process.env.PORT || "http://127.0.0.1:5000";
const socket = io(port, {pingTimeout: 30000});



// tell socket.io to never give up :)s
socket.on('error', function(){
  socket.socket.reconnect();
});

class HumanVsHuman extends Component {
  static propTypes = {
    children: PropTypes.func,
    getGame: PropTypes.func,
    game: PropTypes.object

  };

  constructor(props) {
    super(props)  

  this.state = {
    
    //Game Objects contain information of the current state and players:
    fen: this.props.fen,
    whiteName: '',
    whiteID: '',
    blackName: '',
    blackID: '',
    started: false,
    turn: "white",
    history: [],
    gameID: this.props.gameID,
    

    //Player attributes:
    color: this.props.color,
    username: this.props.name,

    // square styles for active drop square:
    dropSquareStyle: {},
    // custom square styles:
    squareStyles: {},
    // square with the currently clicked piece:
    pieceSquare: "",
    // currently clicked square:
    square: "",

  };
}



  componentDidMount() {
 
    this.logic = new Chess();
    this.fetchGameDetails()
    // .then(() => ).catch((e) => console.log(e))

    socket.on('newPlayer', (data) => {
      if (this.state.gameID === data.gameID) {
        this.setState({
          whiteName: data.whiteName,
          blackName: data.blackName,
          started: data.started
        }) 
      }
    });

    socket.on('moveMade', (data) => {
      console.log('move made')
      console.log(data)
      if (data.gameID === this.state.gameID) {
          console.log('move made by opponent')
          this.logic.move(data.newMove);
          this.setState({fen: this.logic.fen()})
      }
    });

      // socket.on('reconnect', function (sock) {
      //   console.log('you have been reconnected');
      //   // where username is a global variable for the client
      //   sock.emit('user-reconnected', this.props.username);
      // });
      
      this.logic.load(this.state.fen);
  }

  joinGame = () => {
      //TODO: Save game in players profile:
      socket.emit('joined', 
         {gameID: this.state.gameID, 
          whiteName: this.state.whiteName,
          blackName: this.state.blackName,
          started: this.state.started
      });
    }
  // }

  fetchGameDetails = () => {
    Axios.get(`/api/games/${this.props.gameID}`)
     .then((game) => {
       console.log('FETCHED game: '+game.data.fen)
       this.setState(
         {
          color: this.props.color, 
          gameID: this.props.gameID,
          history: game.data.history,
          fen: game.data.fen,
          started: !game.data.needsPlayer,
          whiteName: game.data.white,
          blackName: game.data.black,
         }, () => {
        console.log(this.state)
        this.logic.load(this.state.fen);
      })
        // console.log(game)
     }).then(() => this.joinGame())
     .catch(e => console.log(e));
  }

  // keep clicked square style and remove hint squares
  removeHighlightSquare = () => {
    this.setState(({ pieceSquare, history }) => ({
      squareStyles: squareStyling({ pieceSquare, history })
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
          ...squareStyling({
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
    console.log(this.logic.fen())
    socket.emit('move', {newMove: move, gameID: this.state.gameID });
    this.setState(({ history, pieceSquare }) => ({
      fen: this.logic.fen(),
      history: this.logic.history({ verbose: true }),
      squareStyles: squareStyling({ pieceSquare, history })
    }));
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
      squareStyles: squareStyling({ pieceSquare: square, history }),
      pieceSquare: square
    }));

    let move = this.game.move({
      from: this.state.pieceSquare,
      to: square,
      promotion: "q" // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return;
      else {
        socket.emit('move', { move: move, fen: this.logic.fen(), gameID: this.state.gameID });
      }

    this.setState({
      fen: this.logic.fen(),
      history: this.game.history({ verbose: true }),
      pieceSquare: ""
    });
  };

  onSquareRightClick = square =>
    this.setState({
      squareStyles: { [square]: { backgroundColor: "deepPink" } }
    });

  render() {
  
    const { fen, color, dropSquareStyle, squareStyles } = this.state;

    return this.props.children({
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
} // END HumanVSHuman

export default function ChessGame(username,userGameID,userColor,gameFen) {
  return (
    <div>
      <HumanVsHuman name={username} gameID={userGameID} color={userColor} fen={gameFen}>
        {({
          position,
          onDrop,
          onMouseOverSquare,
          onMouseOutSquare,
          squareStyles,
          dropSquareStyle,
          onDragOverSquare,
          onSquareClick,
          onSquareRightClick,
          orientation,
        }) => (
          <Chessboard
            id="humanVsHuman"
            width={500}
            position={position}
            lightSquareStyle={{backgroundColor: '#f2eaec'}}
            darkSquareStyle={{backgroundColor: '#0E6BA8'}}
            onDrop={onDrop}
            onMouseOverSquare={onMouseOverSquare}
            onMouseOutSquare={onMouseOutSquare}
            boardStyle={{
              borderRadius: "5px",
              boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
              
            }}
            squareStyles={squareStyles}
            dropSquareStyle={dropSquareStyle}
            onDragOverSquare={onDragOverSquare}
            onSquareClick={onSquareClick}
            onSquareRightClick={onSquareRightClick}
            orientation={orientation}
          />
        )}
      </HumanVsHuman>
    </div>
  );
}

const squareStyling = ({ pieceSquare, history }) => {
  const sourceSquare = history.length && history[history.length - 1].from;
  const targetSquare = history.length && history[history.length - 1].to;

  return {
    // #00d0ff
    [pieceSquare]: { backgroundColor: "", },
    ...(history.length && {
      [sourceSquare]: {
        backgroundColor: "",
      }
    }),
    ...(history.length && {
      [targetSquare]: {
        backgroundColor: ""
      }
    })
  };
};