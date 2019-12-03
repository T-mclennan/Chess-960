import React, { Component } from "react";
import PropTypes from "prop-types";
import  Chess  from "chess.js"; 
import Chessboard from "chessboardjsx";
import io from 'socket.io-client';
import {connect} from 'react-redux'
import {GET_GAME, DELETE_GAME} from '../actions/gameActions'
const port = process.env.PORT || "http://127.0.0.1:5000";
const socket = io(port);
let logic = new Chess();

//tell socket.io to never give up :)
// socket.on('error', function(){
//   socket.socket.reconnect();
// });

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
    fen: '',
    whiteName: '',
    whiteID: '',
    blackName: '',
    blackID: '',
    started: false,
    turn: "white",
    history: [],
    

    //Player attributes:
    myColor: '',
    myUsername: '',

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

    this.props.getGame();
    console.log('Children: ' + this.props.children)
    this.setState({username: this.props.user}, () => {
      console.log('player: ' + this.state.myUsername)
    })



    //Request initial board state from server through websocket connection
    // this.connect()
    // .then(() => {
      // this.logic.load(this.state.fen);
    // })
    // .catch(e => console.log(e)) 

    // socket.on('player', (msg) => {
    //   this.setState({color: msg.color, players: msg.players, playerId: msg.playerId, fen: msg.fen}) 
    //   console.log("Player color: "+ this.state.color+ "  player id: " + this.state.playerId)
  
    //   if( this.state.players === 2){
    //       this.setState({play: false})
    //       socket.emit('play', msg.gameId);
    //       console.log("Game in Progress: "+ this.state.gameId) 
    //   }
    //   else
    //       console.log('"Waiting for Second player"')
    // });

    // socket.on('move', function (msg) {
    //   console.log('move made')
    //   if (msg.game === this.state.gameId) {
    //       this.setState(this.game.fen())
    //       this.game.move(msg.move);
    //       // board.position(this.game.fen());
    //       console.log("moved")
    //   }
    // });

      // socket.on('play', function (msg) {
      //   console.log('msg is: '+msg)
      //   console.log('name:' + this.state.username)
      //   console.log('this.game.ID: '+ this.state.gameId)  
      //   if (msg === this.state.gameId) {
      //       this.setState({play: false})
      //       console.log('game in progress')
      //   }
      // });

      // socket.on('reconnect', function (sock) {
      //   console.log('you have been reconnected');
      //   // where username is a global variable for the client
      //   sock.emit('user-reconnected', this.props.username);
      // });
      
      this.logic.load(this.state.game.fen);
  }

  // connect = () => {
  //     console.log('connect function, username is: '+this.props.user)
  //     socket.emit('joined', {gameId: this.state.gameId, username: this.props.user});
  //   // }
  // }

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
        socket.emit('move', { move: move, board: this.game.fen(), room: this.state.gameId });
      }

    this.setState({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
      pieceSquare: ""
    });
  };

  onSquareRightClick = square =>
    this.setState({
      squareStyles: { [square]: { backgroundColor: "deepPink" } }
    });

  render() {
  
    const { fen, dropSquareStyle, squareStyles } = this.state;

    return this.props.children({
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

const mapStateToProps = (state) => ({
   game: state.game
})

export default connect(mapStateToProps, {GET_GAME} )(HumanVsHuman)

export default function ChessGame(username) {
  return (
    <div>
      <HumanVsHuman user ={username}>
        {({
          position,
          onDrop,
          onMouseOverSquare,
          onMouseOutSquare,
          squareStyles,
          dropSquareStyle,
          onDragOverSquare,
          onSquareClick,
          onSquareRightClick
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