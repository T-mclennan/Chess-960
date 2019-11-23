# Chess-960

# This application is a modest attempt at builiding a chess application, styled after a varient developed by Bobby Fischer. 
# This project was chosen to provide more experience with the MERN stack, socket.io, authentication, and deplyoment on Heroku. 

# Chess 960 is a variation of Fischer random, where the back row of pieces is randomized to encourage improvised play.
# However, because true randomization would lead to many board positions that are far out of balance, the board is 
# constructed according to the following conditions:

#    - Both players have identical configurations at the start of the game. 
#    - Each player is first given a black and white bishop in random position.
#    - The queen is placed in one of the remaining 6 squares.
#    - The black and white knight are played randomly in the remaining 5 and 4 squares.
#    - With the 3 remaining squares, the king goes in the middle with the rooks on each side,
#      which allows for castling in both directions. 

Once the start position is generated, it is passed as fen notation into both the board and game logic. 

When a player attempts a move the action is sent to chess.js for validation, is rendered on the board, 
and then broadcast to our server with socket.io so it can be relayed to the other players. If the move is invalid a 
snapback is sent to the board. 

I aim to build out the application to include a game lobby, account options, token usage and more. 
MongoDB will be used for storage so that a player can leave and rejoin a game as they see fit. 
From the lobby players can start a new game or browse / join a pending game. 
