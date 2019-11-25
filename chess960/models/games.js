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

    needsPlayer: {
        type: Boolean,
        required: true,
        default: false
    }

})

module.exports =  Player = mongoose.model('Games', GameSchema)