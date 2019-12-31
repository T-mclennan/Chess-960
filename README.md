# Chess-960: A random twist on the classic game. 
 
# Tools and Architecture: 
 This project was chosen to give practice with MERN stack, socket.io, authentication, and deplyoment on Heroku.
 
    Backend:
    - Node.js and express are used for server logic and route handling 
    - Mongoose and MongoDB for storage (atlas) 
    
    Frontend:
    - Components are created with React, Reactstrap and CSS 
    - JWT and Local Storage are used for Authentication and player permissions
    - Redux is used for application level state management of Authentication, Player, Game, and Error data
    - Axios is used for server requests
    - react-router-dom is used for routing
    - Socket.io is used as websocket for gameplay and player display in lobby
 
# Authentication:

# Lobby: 
  Navbar has page links and settings
  Left sidebar has game options: Dashboard, Quickplay, Findgame, Standings
  Right sidebar has player list, with green for currently logged in players

# Gameplay:
  When a player attempts a move the action is sent to chess.js for validation, is rendered on the board, 
  and then broadcast to our server with socket.io so it can be relayed to the other players. If the move is invalid a 
  snapback is sent to the board. 

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
