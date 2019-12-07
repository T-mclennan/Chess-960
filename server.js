const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const path = require('path');
const http = require('http');
const users = require('./routes/api/players');
const currentGames = require('./routes/api/games');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


//--------------------------------------------------------
//                 Server / Routes:
//--------------------------------------------------------

const app = express();
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

//--------------------------------------------------------
//                 Socket.io:
//--------------------------------------------------------

// initialize a new instance of socket.io by passing the HTTP server object
var io = require('socket.io').listen(server, {pingTimeout: 30000});
io.on('connection', function (socket) {

  socket.on('joined', (data) => {
    console.log('player joined game: '+data.gameID)
    socket.broadcast.emit('newPlayer', data)
  });

  socket.on('move', (data) => {
      socket.broadcast.emit('moveMade', data);
      console.log('move made');
  });

  socket.on('disconnect', function () {
      socket.disconnect()
  }); 
});


//--------------------------------------------------------
//                 MognoDB Config:
//--------------------------------------------------------

const db = require('./config/keys.js').mongoURI;
mongoose
  .connect(db, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


// OAUTH:
//  http://localhost:5000/auth/google/callback
//
// passport.use(new GoogleStrategy());

server.listen(port, () => console.log(`Server started on port ${port}`));
