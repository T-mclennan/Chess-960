const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

//Player Model:
const Player = require("../../models/players");

// // @route   POST api/auth
// // @desc    Authenticates a player
// // @access  Public
router.post("/", (req, res) => {
  const { username, password } = req.body;

  //   // Simple validation
  if (!username || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //   // Check for existing player
  Player.findOne({ username })
    .then(player => {
      if (!player)
        return res.status(400).json({ msg: "Player does not exist" });

      //       // Validate password
      bcrypt
        .compare(password, player.password)
        .then(isMatch => {
          if (!isMatch)
            return res.status(400).json({ msg: "Invalid credentials" });

          jwt.sign(
            { id: player.id },
            keys.jwtSecret,
            { expiresIn: 36000 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                player: {
                  id: player.id,
                  name: player.name,
                  email: player.email
                }
              });
            }
          );
        })
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
});

// // @route   GET api/auth/player
// // @desc    Get user data
// // @access  Private
router.get("/player", auth, (req, res) => {
  Player.findById(req.player.id)
    .select("-password")
    .then(data => {
      res.json(data);
    })
    .catch(e => console.log(e));
});

module.exports = router;
