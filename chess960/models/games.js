const mongoose = require('mongoose')

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
        required: true
    },

    black: {
        type: String,
        default: ""
    },

    history: {
        type: Array,
        required: false
    },

    needsPlayer: {
        type: Boolean,
        default: true
    },

    turn: {
        type: String,
        default: "white"
    }

})

module.exports =  Player = mongoose.model('Games', GameSchema)