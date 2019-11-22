const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const path = require('path');

const port = process.env.PORT || 5000;
const app = express();

var cors = require('cors')
app.use(cors())

const http = require('http').createServer(app);
const io = require('socket.io')(http);

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


io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
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


http.listen(port, () => console.log(`Server started on port ${port}`));
