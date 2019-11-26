const express = require('express')
const router = express.Router();
const Players = require('../../models/Players');

//@route  GET api/player
//@desc   Get all items
//@access public
router.get('/player', (req, res) => {
    Players.find()
      .then(items => res.json(items))
});

//@route  GET api/getAllPlayers
//@desc   Get all items
//@access public
router.get('/getAllPlayers', (req, res) => {
  Players.find()
    .sort({_id})
    .then(items => res.json(items))
});


//@route  POST api/items
//@desc   Create an item
//@access public
router.post('/', (req, res) => {
    const newPlayer = new Item({
        name: req.body.name
    });
    newPlayer.save().then(player => res.json(player));
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