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
    default: []
  },

  started: {
    type: Boolean,
    default: false
  },

  turn: {
    type: String,
    default: "white"
  },

  ended: {
    type: Boolean,
    default: false
  },

  style: {
    type: String,
    default: "960"
  },

  wMin: {
    type: Number,
    default: null
  },

  wSec: {
    type: Number,
    default: null
  },

  bMin: {
    type: Number,
    default: null
  },

  bSec: {
    type: Number,
    default: null
  },

  timer: {
    type: String,
    default: ""
  },

  scoring: {
    type: String,
    default: ""
  }
});

module.exports = Player = mongoose.model("Games", GameSchema);
