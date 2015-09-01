/**
 * Created by Debol on 31-Aug-15.
 */

var pg = require('pg'); //PostgreSQL

var connectionString = process.env.DATABASE_URL;
console.log("ConnectionString is: ");



pg.connect(connectionString, function(err, client) {
    if (err) throw err;

    client
        .query('CREATE TABLE namedob(ID int NOT NULL SERIAL, name VARCHAR(40) not null, dob DATE)')
        .on('end', function(row) {
            console.log(JSON.stringify(row));
        })
    ;
});





//var client = new pg.Client(connectionString);
//client.connect();
//var query = client.query('CREATE TABLE name-dob(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
//query.on('end', function() { client.end(); });
