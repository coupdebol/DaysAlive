// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BearSchema   = new Schema({
    name: String ,
    date_of_birth: String,
    days: String
});

module.exports = mongoose.model('Bear', BearSchema);