const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const path = require('path');
const http = require('http');
const socket = require('socket.io')
const port = process.env.PORT || 5000;
const app = express();

var cors = require('cors')
app.use(cors())


// start the server
const server = http.createServer(app)

// initialize a new instance of socket.io by passing the HTTP server object
const io = socket(server)

// const socket = require('socket.io')
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);

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

//TODO: Add database. In the meantime this creates and keeps track of players in the game;
var players;

// create an array of 100 games and initialize them
var games = Array(100);
for (let i = 0; i < 100; i++) {
   games[i] = {players: 0 , pid: [0 , 0]};
}


io.on('connection', function (socket) {

  // just assign a random number to every player that has connected
  // the numbers have no significance so it
  // doesn't matter if 2 people get the same number
  var playerId =  Math.floor((Math.random() * 100) + 1)
  console.log(playerId + ' connected');
 
  // if a user disconnects just print their playerID
  socket.on('disconnect', function () {
    console.log(playerId + ' disconnected');
  });
 });

// The client side emits a 'move' event when a valid move has been made.
io.on('move', function (msg) {
  // pass on the move event to the other clients
  console.log('move given')
  socket.broadcast.emit('move', msg);
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
