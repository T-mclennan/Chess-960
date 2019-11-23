const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const path = require('path');
const http = require('http');
const port = process.env.PORT || 5000;
const app = express();

// start the server
const server = http.createServer(app)

// initialize a new instance of socket.io by passing the HTTP server object
var io = require('socket.io').listen(server);

// Bodyparser Middleware
app.use(bodyParser.json());


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
  });
}

//   TODO: Add database. In the meantime this creates and keeps track of players in the game;
var players;

// create an array of 100 games and initialize them
var games = Array(100);
for (let i = 0; i < 100; i++) {
   games[i] = {players: 0 , pid: [0 , 0]};
}

io.on('connection', function (socket) {
  // console.log(players);
  var color;
  var playerId =  Math.floor((Math.random() * 100) + 1)
  

  console.log(playerId + ' connected');

  socket.on('joined', function (gameId) {
      // games[roomId] = {}
      if (games[gameId].players < 2) {
          games[gameId].players++;
          games[gameId].pid[games[gameId].players - 1] = playerId;
      }
      else{
          socket.emit('full', gameId)
          return;
      }
      
      console.log(games[gameId]);
      players = games[gameId].players
      console.log('players number is: '+ players)
      
      if (players % 2 == 0) color = 'black';
      else color = 'white';

      socket.emit('player', { playerId, players, color, gameId })
      // players--;

  });

  socket.on('move', function (msg) {
      socket.broadcast.emit('move', msg);
      console.log('move' + msg);
  });

  socket.on('play', function (msg) {
      socket.broadcast.emit('play', msg);
      console.log("ready game #" + msg);
  });

  socket.on('disconnect', function () {
      for (let i = 0; i < 100; i++) {
          if (games[i].pid[0] == playerId || games[i].pid[1] == playerId)
              games[i].players--;
      }
      console.log(playerId + ' disconnected');
  }); 
});


// DB Config
// const db = config.get('mongoURI');

// // Connect to Mongo
// mongoose
//   .connect(db, { 
//     useNewUrlParser: true,
//     useCreateIndex: true
//   }) // Adding new mongo url parser
//   .then(() => console.log('MongoDB Connected...'))
//   .catch(err => console.log(err));

// Use Routes
// app.use('/api/items', require('./routes/api/items'));
// app.use('/api/users', require('./routes/api/users'));
// app.use('/api/auth', require('./routes/api/auth'));


server.listen(port, () => console.log(`Server started on port ${port}`));
