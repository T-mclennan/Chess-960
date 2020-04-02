const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');

//--------------------------------------------------------
//                 Server / Routes:
//--------------------------------------------------------

const app = express();
const server = http.createServer(app);
var currentUsers = [];

app.use(express.json());

//routes:
app.use('/api/players', require('./routes/api/players'));
app.use('/api/games', require('./routes/api/games'));
app.use('/api/auth', require('./routes/api/auth'));

const port = process.env.PORT || 5000;

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//--------------------------------------------------------
//                 Socket.io:
//--------------------------------------------------------

// initialize a new instance of socket.io by passing the HTTP server object
var io = require('socket.io').listen(server, {
  pingTimeout: 30000,
  transports: ['polling'],
});
io.on('connection', socket => {
  socket.on('sendUsername', username => {
    socket.username = username;
    currentUsers.push(socket.username);
    io.emit('updateUsers', currentUsers);
    console.log(username + ' has entered the lobby.');
    console.log(currentUsers);
  });

  socket.on('joined', data => {
    console.log('player joined game: ');
    console.log(data);
    socket.broadcast.emit('newPlayer', data);
  });

  socket.on('move', data => {
    socket.broadcast.emit('moveMade', data);
    console.log('move made');
  });

  socket.on('logout', () => {
    currentUsers = currentUsers.filter(name => {
      return name !== socket.username;
    });
    io.emit('updateUsers', currentUsers);
    console.log(socket.username + ' has logged out.');
    console.log(currentUsers);
    socket.disconnect();
  });

  socket.on('disconnect', () => {
    currentUsers = currentUsers.filter(name => {
      return name !== socket.username;
    });
    io.emit('updateUsers', currentUsers);
    console.log(socket.username + ' has disconnected.');
    console.log(currentUsers);
    socket.disconnect();
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
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

server.listen(port, () => console.log(`Server started on port ${port}`));
