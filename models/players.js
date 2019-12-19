const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const PlayerSchema = new Schema({
  username: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: false
  },

  currentGames: {
    type: Array,
    required: false
  },

  password: {
    type: String,
    required: false
  },

  rating: {
    type: Number,
    required: false,
    default: 1600
  },

  registerDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model("Players", PlayerSchema);
