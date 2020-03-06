const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');

//Player Model:
const Player = require('../../models/players');

// @route  POST api/players/addGameToList
// @desc   Adds a game to players currentGames list:
// @params { userID, gameID }
// @access public
router.post('/addGameToList', (req, res) => {
  Player.findOne({ username: req.body.username })
    .then(player => {
      //pushes GameID into a new copy of gameList, updates player's currentGames:
      let gameList = player.currentGames;
      gameList.push(req.body.gameID);
      Player.updateOne(
        { username: player.username },
        { $set: { currentGames: gameList } }
      )
        .then(() => {
          res.json(gameList);
        })
        .catch(e => console.log(e));
    })
    .catch(err => res.status(404).json({ success: false }));
});

// @route  GET api/players/removeGameFromList
// @desc   Removes a game to players currentGames list:
// @params { userID, gameID }
// @access public
router.post('/removeGameFromList', (req, res) => {
  const { userID, gameID } = req.body;
  Player.findOne({ _id: userID })
    .then(player => {
      //filters out the game selected for deletion:
      var gameList = player.currentGames.filter(() => {
        return hero.franchise !== gameID;
      });

      Player.updateOne(
        { _id: player._id },
        { $set: { currentGames: gameList } }
      )
        .then(() => {
          res.json(gameList);
        })
        .catch(e => console.log(e));
    })
    .catch(err => res.status(404).json({ success: false }));
});

// @route  GET api/players
// @desc   Get a player by id:
// @access private
router.get('/', (req, res) => {
  const { id } = req.body;
  Player.findOne({ id })
    .select('-password')
    .then(player => res.json(player))
    .catch(e => {
      console.log(e);
    });
});

// @route  GET api/players/all
// @desc   Get all players in database
// @access private
router.get('/all', (req, res) => {
  console.log('GET api/players/all');
  Player.find()
    .sort({ username: 1 })
    .then(users => {
      res.json(users);
    })
    .catch(e => {
      console.log(e);
    });
});

// db.collection.find().sort({age:-1}).limit(1)
// @route  GET api/players/getTopPlayers
// @desc   Get the top 10 players in the database
// @access private
router.get('/getTopPlayers', (req, res) => {
  console.log('GET api/players/getTopPlayers');
  Player.find()
    .sort({ rating: -1 })
    .limit(8)
    .then(players => {
      console.log(players);
      res.json(players);
    })
    .catch(e => {
      console.log(e);
    });
});

//@route  POST api/players
//@desc   Register User
//@access public
router.post('/', (req, res) => {
  console.log('api/players: POST');
  console.log(req.body);
  const { username, email, password } = req.body;

  //simple validation:
  if (!username || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  //check for existing user:
  Player.findOne({ username })
    .then(player => {
      console.log('INSIDE findeOne:');
      console.log(player);
      if (player) {
        return res.status(400).json({ msg: 'User already exists' });
      } else {
        const newPlayer = new Player({
          username,
          email,
          password,
          rating: 1600,
        });

        //create salt and hash:
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPlayer.password, salt, (err, hash) => {
            if (err) throw err;
            newPlayer.password = hash;
            newPlayer
              .save()
              .then(player => {
                jwt.sign(
                  { id: player.id },
                  keys.jwtSecret,
                  { expiresIn: 36000 },
                  (err, token) => {
                    if (err) throw err;
                    console.log('REGISTER TOKEN: ');
                    console.log(token);
                    res.json({
                      token,
                      player: {
                        id: player.id,
                        username: player.name,
                        email: player.email,
                        rating: player.rating,
                      },
                    });
                  }
                );
              })
              .catch(e => console.log(e));
          });
        });
      }
    })
    .catch(e => console.log(e));
});

//@route  GET api/players/checkUsername
//@desc   If the user exists, return it from database, otherwise create and return it.
//@access public
// router.post("/checkUsername", (req, res) => {
//   Player.findOne({ username: req.body.username })
//     .select("-password")
//     .then(player => {
//       if (player) res.json(player);
//       else {
//         const newPlayer = new Player({
//           username: req.body.username,
//           password: "",
//           email: ""
//         });
//         newPlayer
//           .save()
//           .then(player => res.json(player))
//           .catch(e => console.log(e));
//       }
//     })
//     .catch(e => {
//       console.log(e);
//     });
// });

//@route  POST api/player
//@desc   Add a player to the database
//@access public
// router.post("/", (req, res) => {
//   const newPlayer = new Player({
//     username: req.body.username,
//     // password: req.body.password,
//     rating: req.body.rating,
//     curentGames: req.body.currentGames
//   });
//   newPlayer
//     .save()
//     .then(player => res.json(player))
//     .catch(e => console.log(e));
// });

//@route  Delete api/player/:id
//@desc   Delete a player
//@access public
router.delete('/:id', (req, res) => {
  Player.findById(req.params.id)
    .select('-password')
    .then(player => player.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ err }));
});
module.exports = router;

//TODO: Add the following routes:

/*
/  api/player/updateRating: update the rating of the current player
/
/
*/
