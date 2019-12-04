const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const path = require('path');
const http = require('http');
const users = require('./routes/api/players');
const currentGames = require('./routes/api/games');
// const board = require('./client/src/components/boardGeneration');

const app = express();

// start the server
const server = http.createServer(app)

// Bodyparser Middleware
app.use(bodyParser.json());

//routes:
app.use('/api/players', users)
app.use('/api/games', currentGames)

const port = process.env.PORT || 5000;

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
   games[i] = {players: 0 , names: ["" , ""], fen:""};
}

//--------------------------------------------------------
//                 Socket.io:
//--------------------------------------------------------

// initialize a new instance of socket.io by passing the HTTP server object
var io = require('socket.io').listen(server);

io.on('connection', function (socket) {
  // console.log(players);
  // var color;
  // // var playerId =  Math.floor((Math.random() * 100) + 1)

  // socket.on('joined', function (data) {
  //     gameId = data.gameId
  //     username = data.username

  //     // console.log('Username: '+data.username)
  //     console.log(data.username + ' connected');
  //     if (games[gameId].players === 0) {
  //       // const board = new boardGeneration()
  //       games[gameId].fen = board.generateBoard()
  //     }

  //     if (games[gameId].players < 2) {
  //         games[gameId].players++;
  //         games[gameId].names[games[gameId].players - 1] = username;
  //     }
  //     else{
  //         socket.emit('game full', gameId)
  //         return;
  //     }
      
  //     console.log(games[gameId]);
  //     players = games[gameId].players
  //     console.log('players number is: '+ players)
      
  //     if (players % 2 == 0) color = 'black';
  //     else color = 'white';
  //     const fen = games[gameId].fen

  //     socket.emit('player', { username, players, color, gameId, fen})
  //     // players--;

  // });

  // socket.on('move', function (msg) {
  //     socket.broadcast.emit('move', msg);
  //     console.log('move' + msg);
  // });

  // socket.on('play', function (msg) {
  //     socket.broadcast.emit('play', msg);
  //     console.log("ready game #" + msg);
  // });

  // socket.on('user-reconnected', function (userId) {
  //   console.log(userId + ' just reconnected');
  // });

  // socket.on('disconnect', function () {
  //     for (let i = 0; i < 100; i++) {
  //         if (games[i].names[0] == username || games[i].names[1] == username)
  //             games[i].players--;
  //     }
  //     console.log(username + ' disconnected');
  // }); 
});


//--------------------------------------------------------
//                 MognoDB Config:
//--------------------------------------------------------
//DB Config: 
const db = require('./config/keys.js').mongoURI;

// // Connect to Mongo
mongoose
  .connect(db, { 
    useNewUrlParser: true,
    useCreateIndex: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


server.listen(port, () => console.log(`Server started on port ${port}`));
