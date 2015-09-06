// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

//current schema version="2.0.0"
var EntrySchema   = new Schema({
    given_name: String ,
    family_name: String,
    date_of_birth: String,
    timestamp: String,
    schema_version: String
});

module.exports = mongoose.model('Entry', EntrySchema);