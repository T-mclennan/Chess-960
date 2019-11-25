const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const PlayerSchema = new Schema({

    fen: {
        type: String,
        required: true
    },

    dateCreated: {
        type: Date,
        default: Date.now
    },

    whitePlayer: {
        type: String,
        required: true
    },

    blackPlayer: {
        type: String,
        required: false
    },

    history: {
        type: Array,
        required: false
    },

    isPlaying: {
        type: Boolean,
        required: true,
        default: false
    }

})

module.exports =  Player = mongoose.model('players', PlayerSchema)