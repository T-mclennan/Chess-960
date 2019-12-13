const express = require('express')
const board = require('../../client/src/components/boardGeneration');

const router = express.Router();

//Game Model for database:
const Game = require('../../models/games');

//@route  GET api/games
//@desc   Get all games
//@access public
router.get('/', (req, res) => {
    Game.find()
      .sort()
      .then(game => res.json(game))
});

//@route  Get api/games/:id
//@desc   Get a game by ID
//@access public
router.get('/:id', (req, res) => {
    Game.findById(req.params.id)
      .then(game => res.json(game))
      .catch(err => res.status(404).json({success: false}));
}); 



//@route  POST api/games/findAnOpenGame
//@desc   Returns an open game if available, otherwise creates and returns new game:
//@access public
router.post('/findGameForPlayer', (req, res) => {
    console.log(req.body)
    Game.findOne({"started" : false})
      .then((game) => {
        //if a game is open, assign the player to as black and return the game:
          if (game) {
            game.black = req.body.username;
            game.started = true;
            Game.updateOne(
              {"_id" : game._id}, 
              {$set: {"started": true, "black": game.black}})
              .then(() => {
                res.json({gameID: game._id, color: "black", fen: game.fen})
              })
              .catch(e => console.log(e))
           } else {
            //Else generate and return a new game with player as white:
            const newGame = new Game({
                fen: board.generateBoard(),
                white: req.body.username,
                started: false,
            });
            newGame.save().then(game => res.json({gameID: game._id, color:"white", fen: game.fen}));
          }
      })
      .catch(err => res.status(404).json({success: false}));
}); 

//@route  POST api/games/findAnOpenGame
//@desc   Returns an open game if available, otherwise creates and returns new game:
//@access public
router.post('/updateGame', (req, res) => {
  Game.updateOne(
    {"_id" : req.body._id}, 
    {$set: {"fen": req.body.fen, "history": req.body.history, "turn": req.body.turn}})
  .then(updatedGame => {
      console.log('updated game: '+ updatedGame)
      // console.log('added '+game.black+ ' to '+game._id)
      res.json('update of '+req.body._id+ ' successful')
  })
  .catch(e => console.log(e))
})

//@route  POST api/games
//@desc   Create a game
//@access public
router.post('/', (req, res) => {
    const newGame = new Game({
        fen: '',
        white: req.body.white,
        black: '',
        history: req.body.history,
        started: req.body.started,
        turn: req.body.turn
    });
    newGame.save().then(game => res.json(game));
}); 

//@route  Delete api/games/:id
//@desc   Delete an game
//@access public
router.delete('/:id', (req, res) => {
    Game.findById(req.params.id)
      .then(game => game.remove().then(() => res.json({success: true})))
      .catch(err => res.status(404).json({success: false}));
}); 

//TODO: the following routes will be added:

/*  api/games/getOpenGames: retrieves the ID of all games that are open
/   api/games/addPlayerToGame: updates the game to include the added player
/   api/games/updateFen: updates the fen string + history to reflect the new gamestate
/   api/games/getGamesByPlayer: retrieves each game the current player is in
*/

module.exports = router;   