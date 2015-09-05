// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EntrySchema   = new Schema({
    given_name: String ,
    family_name: String,
    date_of_birth: String,
    timestamp: String,

});

module.exports = mongoose.model('Entry', EntrySchema);