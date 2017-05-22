5/17/2017
In this folder, this project is just used as a handy reference to build up a heroku node app.
Not using this app per se as heroku seems to need a strict setup to be followed (dependencies, etc.)
to avoid having deploy issues. So I will start by going through their node/heroku example, then 
update it for my app.

4/30/2017

This version is intended to get/display data on the client via Ajax calls.

Was able to generically make the db available to all route files by adding the following to app.js:
app.use(function(req,res,next){
    req.db = db;
    next();
});
Then, when db is required in api call, prepend it with req 
(i.e. req.db.collection('quotes').find().toArray(function(err, results)...)

Added an ajax call that gets data from 'quotes' router, which functions as the DB api.
The data is returned to the client and appended to a div.

4/29/2017

This version has the DB and api calls located in the routes/index.js file
Not completely finished, but hace demonstrated that I can:
1) Pass parameters to API calls (query string in call, req.params in API)
2) Return JSON formatted data by setting req format and using req.send(data) 

To run: use approach that will automatically restart the server on save:

npm run dev