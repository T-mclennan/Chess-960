const express = require('express');
const board = require('../../client/src/components/boardGeneration');
const auth = require('../../middleware/auth');

const router = express.Router();

//Game Model for database:
const Game = require('../../models/games');

//@route  GET api/games
//@desc   Get all games
//@access public
router.get('/', (req, res) => {
  Game.find()
    .sort()
    .then((games) => res.json(games));
});

//@route  Get api/games/:id
//@desc   Get a game by ID
//@access public
router.get('/:id', (req, res) => {
  Game.findById(req.params.id)
    .then((game) => {
      res.json(game);
    })
    .catch((err) => res.status(404).json({ success: false }));
});

//@route  POST api/games/findAnOpenGame
//@desc   Returns an open game if available, otherwise creates and returns new game:
//@access private
router.post('/findGameForPlayer', auth, (req, res) => {
  Game.findOne({ started: false })
    .then((game) => {
      //if a game is open, assign the player to as black and return the game:
      if (game) {
        game.black = req.body.username;
        game.started = true;
        Game.updateOne(
          { _id: game._id },
          { $set: { started: true, black: game.black } }
        )
          .then(() => {
            res.json({ gameID: game._id, color: 'black', fen: game.fen });
          })
          .catch((e) => console.log(e));
      } else {
        //Else generate and return a new game with player as white:
        const newGame = new Game({
          fen: board.generateBoard(),
          white: req.body.username,
          started: false,
        });
        newGame
          .save()
          .then((game) =>
            res.json({ gameID: game._id, color: 'white', fen: game.fen })
          );
      }
    })
    .catch((err) => res.status(404).json({ success: false }));
});

//@route  get api/games/findAnOpenGame
//@desc   Returns an open game if available, otherwise creates and returns new game:
//@access private
router.get('/findAnOpenGame', (req, res) => {
  console.log('inside /findeanopengame:');
  Game.findOne({ started: false })
    .then((game) => {
      console.log(game);
      res.json(game);
    })
    .catch((err) => res.status(404).json({ success: false }));
});

//@route  GET api/games/findAllOpenGames
//@desc   Returns all open games.
//@access private
router.get('/findOpenGames', (req, res) => {
  console.log('inside findGames:');
  // console.log(req.body);
  Game.find()
    // { started: false }
    // .sort({ dateCreated: -1 })
    .then((games) => {
      console.log(games);
      res.json(games);
    })
    .catch((err) => res.status(404).json({ success: false }));
});

//@route  GET api/games
//@desc   Get all games
//@access public
router.get('/findOpenGames', (req, res) => {
  Game.find()
    .sort()
    .then((games) => res.json(games));
});

//@route  POST api/games/joinGame
//@desc   Attempts to join a game designated by ID:
//Takes in {id, username}
//@access private
router.post('/joinGame', (req, res) => {
  console.log('inside of joinGame');
  console.log(req.body);
  Game.findById(req.body.gameID)
    .then((game) => {
      console.log(game);
      if (!game.white) {
        game.white = req.body.username;
      } else if (!game.black) {
        game.black = req.body.username;
      } else {
        console.log('Game is full.');
        return;
      }
      // game.started = true;
      Game.updateOne(
        { _id: game._id },
        {
          $set: { black: game.black, white: game.white },
        }
      )
        .then((result) => {
          res.json(game);
        })
        .catch((e) => console.log(e));
    })
    .catch((e) => console.log(e));
});

//@route  GET api/startGame/:id
//@desc   Attempts to join a game designated by ID:
//Takes in {id, username}
//@access private
router.get('/startGame/:id', (req, res) => {
  Game.findById(req.params.id)
    .then((game) => {
      Game.updateOne(
        { _id: game._id },
        {
          $set: { started: true },
        }
      )
        .then((result) => {
          res.json(result);
        })
        .catch((e) => console.log(e));
    })
    .catch((e) => console.log(e));
});

//@route  POST api/games/updateGame
//@desc   Updates the attributes of a game:
//@access public
router.post('/updateGame', (req, res) => {
  const {
    fen,
    white,
    black,
    history,
    turn,
    started,
    ended,
    wTime,
    bTime,
  } = req.body;
  console.log('inside Update Game:');
  console.log(req.body);
  Game.updateOne(
    { _id: req.body._id },
    {
      $set: {
        fen,
        white,
        black,
        history,
        turn,
        started,
        ended,
        wTime,
        bTime,
      },
    }
  )
    .then((updatedGame) => {
      console.log('updated game: ' + updatedGame);
      // console.log('added '+game.black+ ' to '+game._id)
      res.json('update of ' + req.body._id + ' successful');
    })
    .catch((e) => console.log(e));
});

//@route  POST api/games/updateGame
//@desc   Updates the attributes of a game:
//@access public
router.post('/moveMade', (req, res) => {
  const { fen, history, turn, wTime, bTime } = req.body;
  console.log('Move Made: turn is now..');
  console.log(req.body.gameID);
  Game.updateOne(
    { _id: req.body.gameID },
    {
      $set: {
        fen,
        history,
        turn,
        wTime,
        bTime,
      },
    }
  )
    .then(() => {
      // console.log('added '+game.black+ ' to '+game._id)
      res.json('update of ' + req.body.gameID + ' successful');
    })
    .catch((e) => console.log(e));
});

//@route  POST api/games/gameOver
//@desc   Updates the attributes of a game:
//@access public
router.post('/gameOver', (req, res) => {
  const { gameID } = req.body;
  console.log(`marking game ${gameID} as over`);
  Game.updateOne(
    { _id: gameID },
    {
      $set: {
        ended: true,
      },
    }
  )
    .then((updatedGame) => {
      console.log(updatedGame);
    })
    .catch((e) => console.log(e));
});

//@route  POST api/games
//@desc   Create a game
//@access private
//Arguments: {style, white, black, timer, scoring}
router.post('/', (req, res) => {
  const { black, white, style, timer } = req.body;
  const standard = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  const wTime = timer === 'Unlimited' ? null : Number(timer) * 60;
  const bTime = timer === 'Unlimited' ? null : Number(timer) * 60;
  const newGame = new Game({
    fen: req.body.style === '960' ? board.generateBoard() : standard,
    white,
    black,
    timer,
    style,
    wTime,
    bTime,
  });
  newGame.save().then((game) => res.json(game));
});

//@route  Delete api/games/:id
//@desc   Delete an game
//@access private
router.delete('/:id', auth, (req, res) => {
  Game.findById(req.params.id)
    .then((game) => game.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ msg: err }));
});

module.exports = router;
