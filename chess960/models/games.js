const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const GameSchema = new Schema({

    fen: {
        type: String,
        required: true
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
        required: false
    },

    history: {
        type: Array,
        required: false
    },

    needsPlayer: {
        type: Boolean,
        required: true,
        default: false
    },

    turn: {
        type: String,
        required: true
    }

})

module.exports =  Player = mongoose.model('Games', GameSchema)