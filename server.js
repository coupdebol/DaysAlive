// server.js
console.log("Starting server");
console.log("DB URL:" + process.env.DATABASE_URL);
if(process.env.DATABASE_URL === undefined)
{
    process.exit();
}

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var fs         = require('fs');
var path       = require('path');
var pg = require('pg'); //PostgreSQL

var connectionString = process.env.DATABASE_URL;
var client = new pg.Client(connectionString);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var jade = require('jade');



// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// REGISTER OUR ROUTES -------------------------------
app.use('/', router);
app.use(express.static('node_modules'));


router.get('/', function(req, res) {
    console.log("sending index to client!");
    res.send(jade.renderFile('app/views/index.jade', {pretty:true}));
});


// more routes for our API will happen here
// on routes that end in /bears
// ----------------------------------------------------
router.route('/api/bears')
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        var queryString = 'INSERT INTO namedob(name,date_of_birth) VALUES (\''+req.body.name+'\',\''+req.body.date_of_birth+'\');';
        pg.connect(connectionString,function(err,client,done){
            console.log("Connecting..");
            if(err) {
                return console.error('could not connect to postgres', err);
            }
            var query = client.query(queryString, function(err,result){
                console.log("Sending query.."+queryString);
                if(err) {
                    return console.error('error running query', err);
                }
                done();
            });
        });
    })
    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        var queryString = "SELECT * FROM namedob;";

        pg.connect(connectionString,function(err,client,done){
            console.log("Connecting..");
            if(err) {
                return console.error('could not connect to postgres', err);
            }
            var query = client.query(queryString, function(err,result){
                console.log("Sending query..");
                if(err) {
                    return console.error('error running query', err);
                }
                done();
            });
            query.on('end', function(result){
                res.send(result.rows);
            });

        });
    });

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/api/bears/:bear_id')
    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        console.log("../api/bears/:bear_id'");
        //Bear.findById(req.params.bear_id, function(err, bear) {
        //    if (err)
        //        res.send(err);
        //    res.json(bear);
        //});
    })
    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        //Bear.findById(req.params.bear_id, function(err, bear) {
        //
        //    if (err)
        //        res.send(err);
        //
        //    var days = generateDays(req.body.date_of_birth);
        //
        //    bear.name = req.body.name;  // update the bears info
        //    bear.date_of_birth = req.body.date_of_birth;
        //    bear.days = days;
        //    // save the bear
        //    bear.save(function(err) {
        //        if (err)
        //            res.send(err);
        //
        //        res.json({ days: 'Bear updated!' });
        //    });
        //
        //});
    })
    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        //Bear.remove({
        //    _id: req.params.bear_id
        //}, function(err, bear) {
        //    if (err)
        //        res.send(err);
        //
        //    res.json({ message: 'Successfully deleted' });
        //});
    });


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('====================================================');
console.log('Magic happens on port ' + port);
console.log('====================================================');

