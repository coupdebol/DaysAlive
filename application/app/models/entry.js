// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EntrySchema   = new Schema({
    name: String ,
    date_of_birth: String,
    timestamp: String
});

module.exports = mongoose.model('Entry', EntrySchema);