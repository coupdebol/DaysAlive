// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var Bear       = require('./app/models/bear');
var mongoose   = require('mongoose');
var path        = require('path');
mongoose.connect('mongodb://127.0.0.1:27017');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var jade = require('jade');



// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
var views = express.Router();

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use('/',views);



views.get('/', function(req, res) {
    var html = jade.renderFile('app/views/index.jade', []);
    res.send(html);
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var days = generateDays(req.body.date_of_birth);

        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)
        bear.date_of_birth = req.body.date_of_birth;
        bear.days = days;


        // save the bear and check for errors
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });

    })
    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Bear.find(function (err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    })
    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Bear.findById(req.params.bear_id, function(err, bear) {

            if (err)
                res.send(err);

            var days = generateDays(req.body.date_of_birth);

            bear.name = req.body.name;  // update the bears info
            bear.date_of_birth = req.body.date_of_birth;
            bear.days = days;
            // save the bear
            bear.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ days: 'Bear updated!' });
            });

        });
    })
    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });




// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

function generateDays(dateString)
{
    var now = new Date();
    var todayAtMidn = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var dt = new Date(dateString);
    var result = todayAtMidn.getMilliseconds() - dt.getMilliseconds();
    var output = (((result / 1000 )/60)/60)/24;
    console.log(output);
    return output;
}