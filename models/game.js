var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GameSchema = new Schema({
    pl_number: { type: Number, min: 2, max: 8, required: true },
    cur_player: { type: Number, min: 1, max: 8, required: true },
    name: String,
    size: { 
        width: { type: Number, min: 5, required: true },
        height: { type: Number, min: 5, required: true }
    },
    board: [[Number]]
});

module.exports = mongoose.model('Game', GameSchema)