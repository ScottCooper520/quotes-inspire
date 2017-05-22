// This is a sample node/mongo project
// Database and API access to it is in the index.js file.

const express = require('express');
const bodyParser= require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

var db = null;

// Export app module as it is needed in routing file (index.js) as well
var app = module.exports = express();

// Use index.js to specify api route that returns webpage
var index = require('./routes/index');
// Use quotes.js to soecify api routes that return json data
var quotes = require('./routes/quotes');

// Use body-parser for Node to understand how to handle html (form, etc).
// Otherwise can only pass back simple strings?
app.use(bodyParser.urlencoded({extended: true}));

// Get reference to assets so they can be found via url
app.use(express.static(path.join(__dirname, 'public')));

// This is the connection string
var dbUrl = 'mongodb://scottc_db:scottc_db_rsc@ds111771.mlab.com:11771/mongo_test1';

// Connect to database then start the server.
MongoClient.connect(dbUrl, (err, database) => {
	if (err) {
		return console.log(err);
	}
	db = database;
	// ... start the server
	// app.listen(3000, () => {
	// console.log('listening on 3000');
	// Use 5000 for heroku?
	app.listen(process.env.PORT || 5000, () => {
	console.log('listening on 5000');
	});
});

// Make our db accessible to our routers (access via req)
app.use((req,res,next) => {
    req.db = db;
    next();
});

// Use router to render 
app.use('/', index);
// Use this url prefix to access quotes (json/data IO)
app.use('/quotes', quotes);

