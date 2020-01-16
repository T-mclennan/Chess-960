const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const GameSchema = new Schema({
  fen: {
    type: String,
    default: ""
  },

  dateCreated: {
    type: Date,
    default: Date.now
  },

  white: {
    type: String,
    default: ""
  },

  black: {
    type: String,
    default: ""
  },

  history: {
    type: Array,
    required: false
  },

  started: {
    type: Boolean,
    default: false
  },

  turn: {
    type: String,
    default: "white"
  }
});

module.exports = Player = mongoose.model("Games", GameSchema);
