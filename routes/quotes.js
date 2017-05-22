// This file handles general API and database connections

var express = require('express');
var router = express.Router();
// This seems to be required when you want to access DB id
var ObjectId = require('mongodb').ObjectID;

// This is how I get access to exported app module from app.js (needed to setup listener)
// Require gets exported modules from separate files
var app = require('../app');

/* Note that quotes prefix is auto-appended to this url as specified in app.js
	app.use('/quotes', quotes);
	In postman call, use: http://localhost:3000/quotes */
/* Get home page */
router.get('/', (req, res, next) => {
		// Set the response type to json
	res.setHeader('Content-Type', 'application/json');
	// Prettified
	// res.send(JSON.stringify({ a: 1 }, null, 3));
	req.db.collection('quotes').find().toArray((err, results) => {
		console.log(results);
		res.send(JSON.stringify(results));
		// OK - Get a result by id. Result is in array[0]
	  // db.collection('quotes').find(ObjectId('5904e014d73ea9276822d44b')).toArray(function(err, results) {
	  // 	console.log(results[0]);
	  // });
	});
});

// Create a collection called "quotes" and store user's form data in it on save.
// This is currently called from the form in the index.html file.
 router.post('/', (req, res) => {
   req.db.collection('quotes').save(req.body, (err, result) => {
    if (err) {
		return console.log(err);
	}

    console.log('saved to database');
		// Now reload browser so user can take some new action if desired
    res.redirect('/');
  });
});

// Update an item from the collection. Do so by ID.
 router.put('/:uid', (req, res) => {
	 var uid = req.params.uid;
	 console.log("Put uid = " + uid);
   req.db.collection('quotes', (err, collection) => {
    if (err) {
		return console.log(err);
	}
	// ToDo: Determine how to replace all the contents except for the ID 
	//collection.update({"_id": ObjectId(uid), }, );
    console.log('doc updated in database');
		// Now reload browser so user can take some new action if desired
    res.redirect('/');
  });
});

// Remove an item from the collection. Do so by ID.
	// Example: app.get('/user/:uid/photos/:file', function(req, res){
	// var uid = req.params.uid
	// , file = req.params.file;
	// Example Postman access (DETETE by name): http://localhost:3000/Scotty 
 // router.delete('/:uid', (req, res) => {
 router.delete('/:name', (req, res) => {
	//router.delete('/', (req, res) => {
	 var uid = req.params.uid;
	 var name = req.params.name;
	 console.log("Delete uid = " + uid);
	 console.log("Delete name = " + name);
   req.db.collection('quotes', (err, collection) => {
    if (err) {
		return console.log(err);
	}

	// collection.remove({_id: "5904e014d73ea9276822d44b"}, true); // Delete first match
	collection.remove({"_id": name}, true); // Delete first match

    console.log('deleted from database');
		// Now reload browser so user can take some new action if desired
    res.redirect('/');
  });
});

// Not used for now as id is automatically added to DB entries
function getGuid() {
	return Guid.create();
}

module.exports = router;
