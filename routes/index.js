// This file serves the index.html page to the browser
var path = require('path');
var express = require('express');
var router = express.Router();

// This is how I get access to exported app module from app.js (needed to setup listener)
// Require gets exported modules from separate files
var app = require('../app');

/* Get home page */
router.get('/', (req, res, next) => {
	// __dirname resolves to build/routes folder from here, navigate back up
	res.sendFile(path.join(__dirname, '/../views', 'index.html'));
	req.db.collection('quotes').find().toArray((err, results) => {
		console.log(results);
	});
});

// Not used for now as id is automatically added to DB entries
function getGuid() {
	return Guid.create();
}

module.exports = router;
