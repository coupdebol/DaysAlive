// server.js
console.log("Starting server");
console.log("DB URL:" + process.env.MONGOLAB_URI);
if(process.env.MONGOLAB_URI === undefined)
{
    process.exit();
}

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var jade = require('jade');
var mongoose     = require('mongoose');

var connectionString = process.env.MONGOLAB_URI;
mongoose.connect(connectionString);
var Entry     = require('./application/app/models/entry');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port



// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// REGISTER OUR ROUTES -------------------------------
app.use('/', router);
app.use(express.static('web-libraries'));


router.get('/', function(req, res) {
    res.send(jade.renderFile('./application/app/views/index.jade', {pretty:true}));
});


// more routes for our API will happen here
// on routes that end in /bears
// ----------------------------------------------------
router.route('/api/entry')
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        var entry = new Entry();      // create a new instance of the model
        entry.name = req.body.name;
        entry.date_of_birth = new Date(req.body.date_of_birth);
        entry.timestamp = new Date();


        entry.save(function(err) {
            if (err)
                res.send(err);
            console.log("entry created ("+req.body.name+","+req.body.date_of_birth+")");
            res.json({ message: 'entry created!' });
        });

    })
    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Entry.find(function(err, entries) {
            if (err)
                res.send(err);
            console.log("sending all entries to client!");
            res.json(entries);
        }).sort('-timestamp');
    });

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/api/entry/:entry_id')

    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        Entry.remove({
            _id: req.params.entry_id
        }, function(err, entry) {
            if (err)
                res.send(err);
            console.log("removed entry: "+req.params.entry_id);
            res.json({ message: 'Successfully deleted' });
        });
    });


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('====================================================');
console.log('Magic happens on port ' + port);
console.log('====================================================');

