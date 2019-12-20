const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");

//TODO: ADD auth middleware
//
//

//Player Model:
const Player = require("../../models/players");

//REDUNDANT PLAYER API:

//@route  GET api/player
//@desc   Get all players
//@access public
// router.get("/", (req, res) => {
//   Player.find()
//     .select("-password")
//     .then(players => res.json(players))
//     .catch(e => {
//       console.log(e);
//     });
// });

//@route  POST api/players
//@desc   Register User
//@access public
router.post("/", (req, res) => {
  console.log("api/players: POST");
  console.log(req.body);
  const { username, email, password } = req.body;

  //simple validation:
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //check for existing user:
  Player.findOne({ username }).then(player => {
    if (player) return res.status(400).json({ msg: "User already exists" });
  });

  const newPlayer = new Player({
    username,
    email,
    password,
    rating: 1600
  });

  //create salt and hash:
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newPlayer.password, salt, (err, hash) => {
      if (err) throw err;
      newPlayer.password = hash;
      newPlayer.save().then(player => {
        jwt.sign(
          { id: player.id },
          keys.jwtSecret,
          { expiresIn: 36000 },
          (err, token) => {
            if (err) throw err;
            console.log("REGISTER TOKEN: ");
            console.log(token);
            res.json({
              token,
              player: {
                id: player.id,
                username: player.name,
                email: player.email,
                rating: player.rating
              }
            });
          }
        );
      });
    });
  });
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
router.delete("/:id", (req, res) => {
  Player.findById(req.params.id)
    .select("-password")
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
