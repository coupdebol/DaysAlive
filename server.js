// server.js
console.log("Starting server");
console.log("DB URL:" + process.env.DATABASE_URL);

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
        console.log("creating a new entry..");
        var query = 'INSERT INTO namedob(id,name,dob) VALUES (2,"'+req.body.name+'","'+req.body.date_of_birth+'");';
        runQuery(query);
    })
    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        console.log("gathering all entries..");
        var query = "SELECT * FROM namedob;";
        runQuery(query,res);
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

function runQuery(queryString, res){
    console.log(queryString);
    pg.connect(connectionString,function(err,client,done){
        if(err) {
            return console.error('could not connect to postgres', err);
        }
        var query = client.query(queryString, function(err, result){
            done();
            if(err) {
                return console.error('error running query', err);
            }
        });
        query.on('row', function(row,result) {
            result.addRow(row);
            console.log(result.rows);
            res.send(result.rows);
        });
    });
}


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('====================================================');
console.log('Magic happens on port ' + port);
console.log('====================================================');

