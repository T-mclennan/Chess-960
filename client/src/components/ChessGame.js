import React, { Component } from "react";
import Chessboard from "chessboardjsx";
import PlayerDetails from "./PlayerDetails";
import HumanVsHuman from "./HumanVsHuman";
import {connect} from 'react-redux';


export default function ChessGame(username,userGameID,userColor,gameFen) {
  return (
    <div>
      <HumanVsHuman 
      // name={username} gameID={userGameID} color={userColor} fen={gameFen}
      >
        {({
          draggable,
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
          whiteName,
          blackName,
        }) => (
          // <div style={{display: "flex"}}>
          //    <PlayerDetails name={whiteName} color={"white"}/>
          <Chessboard
            id="humanVsHuman"
            width={500}
            position={position}
            draggable={draggable}
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
