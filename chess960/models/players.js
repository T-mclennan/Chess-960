const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const PlayerSchema = new Schema({

    username: {
        type: String,
        required: true
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
        required: true,
        default: 1600
    }
})

module.exports =  Item = mongoose.model('players', PlayerSchema)