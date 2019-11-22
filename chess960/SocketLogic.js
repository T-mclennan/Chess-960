var color; // black or white

// 'joined' is emitted when the player enters a room number and clicks
// the connect button the room ID that the player entered gets passed as a message

socket.on('joined', function (roomId) {
 // if the room is not full then add the player to that room
 if (games[roomId].players < 2) {
     games[roomId].players++;
     games[roomId].pid[games[roomId].players - 1] = playerId;
 } // else emit the full event
 else{
     socket.emit('full', roomId)
     return;
 }
  console.log(games[roomId]);
 players = games[roomId].players
  // the first player to join the room gets white
 if (players % 2 == 0) color = 'black';
 else color = 'white';

 // this is an important event because, once this is emitted the game
 // will be set up in the client side, and it'll display the chess board
 socket.emit('player', { playerId, players, color, roomId })

});

// The client side emits a 'move' event when a valid move has been made.
socket.on('move', function (msg) {
 // pass on the move event to the other clients
 socket.broadcast.emit('move', msg);
});

// 'play' is emitted when both players have joined and the game can start
socket.on('play', function (msg) {
 socket.broadcast.emit('play', msg);
 console.log("ready " + msg);
});

// when the user disconnects from the server, remove him from the game room
socket.on('disconnect', function () {
 for (let i = 0; i < 100; i++) {
     if (games[i].pid[0] == playerId || games[i].pid[1] == playerId)
         games[i].players--;
 }
 console.log(playerId + ' disconnected');

});