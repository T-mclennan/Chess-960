const express = require('express')
const router = express.Router();
const Game = require('../../models/Games');

//@route  GET api/games
//@desc   Get all games
//@access public
router.get('/games', (req, res) => {
    Game.find()
      .sort()
      .then(game => res.json(game))
});

//@route  POST api/games
//@desc   Create a game
//@access public
router.post('/games', (req, res) => {
    const newGame = new Game({
        fen: req.body.fen,
        white: req.body.white,
        black: req.body.black,
        history: req.body.history,
        needsPlayer: req.body.needsPlayer,
    });
    newGame.save().then(game => res.json(game));
}); 

//@route  Delete api/games/:id
//@desc   Delete an game
//@access public
router.delete('/games:id', (req, res) => {
    Game.findById(req.params.id)
      .then(game => game.remove().then(() => res.json({success: true})))
      .catch(err => res.status(404).json({success: false}));
}); 

module.exports = router;   