var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recordSchema = new Schema({
    artist: String,
    album_name: String,
    format: String,
    type: String,
    release_date: String,
    label: String,
    cover_art: String,
    tracklist: [
        {
            number: Number,
            name: String,
            duration: String
        }
    ]
});

module.exports = mongoose.model('Record', recordSchema);