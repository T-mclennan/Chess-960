const express = require('express')
const router = express.Router();

//Game Model for database:
const Game = require('../../models/Games');

//@route  GET api/games
//@desc   Get all games
//@access public
router.get('/', (req, res) => {
    Game.find()
      .sort()
      .then(game => res.json(game))
});

//@route  POST api/games
//@desc   Create a game
//@access public
router.post('/', (req, res) => {
    const newGame = new Game({
        fen: req.body.fen,
        white: req.body.white,
        black: req.body.black,
        history: req.body.history,
        needsPlayer: req.body.started,
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