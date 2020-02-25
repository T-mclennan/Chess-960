# Chess-960: A random twist on classic chess. 

  ### Explore project [here](https://chess-960.herokuapp.com/) while it continues to be developed.
 
 ---
 
- ## Tools and Architecture: 
    This project was chosen to give practice with MERN stack, socket.io, authentication, and deplyoment on Heroku.
 
  ##### Backend:
    - Node.js and express are used for server logic and route handling 
    - MongoDB atlas used with Mongoose for storage
    
  ##### Frontend:
    - Components are created with React, Reactstrap and CSS 
    - JWT and Local Storage are used for Authentication and player permissions
    - Redux is used for application level state management of Authentication, Player, Game, and Error data
    - Axios is used for server requests
    - React Router Dom is used for client-side routing
    - Socket.io is used as websocket for gameplay and player display in lobby
   
  ##### Game Tools: 
    - [Chess.js](https://github.com/jhlywa/chess.js/) is used for move validation
    - [Chessboard.jsx](https://github.com/willb335/chessboardjsx/) is used for the game board
      
- ## Authentication:
    Whena player logs in a JSON webtoken is created for the session and is stored in local storage of the browser. 
    When a player logs out this is cleared. This gives the player the ability to maintain a session and not have to log 
    in every visit, unless they explicitly log out. This feature is currently disabled so that players can open multiple tabs
    and play themselves, as a demonstration of the app.
 

- ## Lobby: 

    Left sidebar has game options: Dashboard, Quickplay, Findgame, Standings
    Right sidebar has player list, with green for currently logged in players
  
  <img width="1280" alt="Lobby" src="https://user-images.githubusercontent.com/43154475/74298059-84ff9280-4cfd-11ea-93d2-6a30c6739d99.png">
   
- ## Dashboard: 
     If the player has no games pending, the Dashboard welcomes the player and provides information.
     Otherwise the dashboard has a listing of current games to re-open.
             
- ## Quickplay:
   Joins the most recently created open game.
   If none is available it will create and open a default game.
             
- ## Findgame: 
     Displays a table listing of all the open games that are possible to join
     Clicking on a listing will join and open that game. 
            
- ## Standings: 
     Displays a table listing of the top 10 player standings. 
             
  
   Future releases will add interactivity for the list of players on the right side: the ability to click a players name and
   challenge them, or open a chat modal. 
  
  
- ## Gameplay:
   When any game event happens such as a player joining, a move being made, etc. the information is bundled and sent to the
   server, which broadcasts it to other players in the game. Many events also coincide with dispatching a redux action to save
   the game state into the store as well as an API call to save the information in the servers database. 
   
   <img width="1280" alt="Game" src="https://user-images.githubusercontent.com/43154475/74298052-7f09b180-4cfd-11ea-9155-c3e02eb56dec.png">
   
   The game status is checked during the initial load, as well as after each move. Possible status could show a player in
   check or checkmate, a stalemate position, draw from three-fold repetition. If the game is over a modal will pop up 
   displaying the status and the winner of the match. 
   
   Future development of the game will include the addition of a scoring algorithm for rated games, the implementation of a
   time clock, and the addition of castling. (Not currently supported by our chess engine for 960)
   
 - ## Inspiration:
    Chess 960 is a variation of [Fischer Random](https://en.wikipedia.org/wiki/Fischer_random_chess), where the back row of pieces is randomized to encourage improvised play.
    However, because true randomization would lead to many board positions that are far out of balance, the board is 
    constructed according to the following conditions:

    - Both players have identical configurations at the start of the game. 
    - Each player is first given a black and white bishop in random position.
    - The queen is placed in one of the remaining 6 squares.
    - The black and white knight are played randomly in the remaining 5 and 4 squares.
    - With the 3 remaining squares, the king goes in the middle with the rooks on each side,
      which allows for castling in both directions. Once the start position is generated, it is passed as fen notation into both the board and game logic. 
