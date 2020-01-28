import React from "react";
import Chessboard from "chessboardjsx";
import HumanVsHuman from "./HumanVsHuman";
import SocketContext from "./../socket-context";

export default function ChessGame() {
  return (
    <div>
      <SocketContext.Consumer>
        {socket => (
          <HumanVsHuman socket={socket}>
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
              orientation
            }) => (
              <Chessboard
                id="humanVsHuman"
                width={500}
                position={position}
                draggable={draggable}
                lightSquareStyle={{ backgroundColor: "#f2eaec" }}
                darkSquareStyle={{ backgroundColor: "#0E6BA8" }}
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
        )}
      </SocketContext.Consumer>
    </div>
  );
}
