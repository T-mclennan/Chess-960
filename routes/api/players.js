const express = require('express')
const router = express.Router();

//Player Model:
const Player = require('../../models/players');

//@route  GET api/player
//@desc   Get all players
//@access public
router.get('/', (req, res) => {
    Player.find()
      .then(players => res.json(players))
      .catch(e => {console.log(e)})
});

//@route  GET api/player/checkUsername
//@desc   If the user exists, return it from database, otherwise create and return it.
//@access public
router.get('/checkUsername', (req, res) => {
  Player.findOne({'username': req.body.username})
    .then(player => {
      if (player)
        res.json(player)
      else {
        const newPlayer = new Player({
          username: req.body.username,
          // password: req.body.password,
      });
      newPlayer.save()
      .then(player => res.json(player))
      .catch(e => console.log(e));
      }
    })
    .catch(e => {console.log(e)})
});


//@route  POST api/player
//@desc   Add a player to the database
//@access public
router.post('/', (req, res) => {
    const newPlayer = new Player({
        username: req.body.username,
        // password: req.body.password,
        rating: req.body.rating,
        curentGames: req.body.currentGames

    });
    newPlayer.save()
    .then(player => res.json(player))
    .catch(e => console.log(e));
}); 

//@route  Delete api/player/:id
//@desc   Delete a player
//@access public
router.delete('/:id', (req, res) => {
    Player.findById(req.params.id)
      .then(player => player.remove().then(() => res.json({success: true})))
      .catch(err => res.status(404).json({success: false}));
}); 
module.exports = router;   


//TODO: Add the following routes:

/*
/  api/player/updateRating: update the rating of the current player
/
/
*/