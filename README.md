# Chess-960: A random twist on the classic game of chess. 

See project [here](https://chess-960.herokuapp.com/)
 
# Tools and Architecture: 
 This project was chosen to give practice with MERN stack, socket.io, authentication, and deplyoment on Heroku.
 
    Backend:
    - Node.js and express are used for server logic and route handling 
    - MongoDB atlas used with Mongoose for storage
    
    Frontend:
    - Components are created with React, Reactstrap and CSS 
    - JWT and Local Storage are used for Authentication and player permissions
    - Redux is used for application level state management of Authentication, Player, Game, and Error data
    - Axios is used for server requests
    - React Router Dom is used for client-side routing
    - Socket.io is used as websocket for gameplay and player display in lobby
   
   Game Tools: 
    - [Chess.js](https://github.com/jhlywa/chess.js/) is used for move validation
    - [Chessboard.jsx](https://github.com/willb335/chessboardjsx/) is used for the game board
 
# Authentication:

# Lobby: 
  Navbar has page links and settings
  Left sidebar has game options: Dashboard, Quickplay, Findgame, Standings
  Right sidebar has player list, with green for currently logged in players
  
  <img width="1280" alt="Game" src="https://user-images.githubusercontent.com/43154475/74298052-7f09b180-4cfd-11ea-9155-c3e02eb56dec.png">

# Gameplay:
  When a player attempts a move the action is sent to chess.js for validation, is rendered on the board, 
  and then broadcast to our server with socket.io so it can be relayed to the other players. If the move is invalid a 
  snapback is sent to the board. 
  
  <img width="1280" alt="Lobby" src="https://user-images.githubusercontent.com/43154475/74298059-84ff9280-4cfd-11ea-93d2-6a30c6739d99.png">

# Inspiration:
  Chess 960 is a variation of Fischer random, where the back row of pieces is randomized to encourage improvised play.
  However, because true randomization would lead to many board positions that are far out of balance, the board is 
  constructed according to the following conditions:

    - Both players have identical configurations at the start of the game. 
    - Each player is first given a black and white bishop in random position.
    - The queen is placed in one of the remaining 6 squares.
    - The black and white knight are played randomly in the remaining 5 and 4 squares.
    - With the 3 remaining squares, the king goes in the middle with the rooks on each side,
      which allows for castling in both directions. Once the start position is generated, it is passed as fen notation into both the board and game logic. 
