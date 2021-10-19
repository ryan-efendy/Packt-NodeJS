// set up ======================================================================
require('dotenv').config()
var express = require('express');
var app = express(); 						// create our app w/ express
var mongoose = require('mongoose'); 				// mongoose for mongodb
var port = process.env.PORT || 3000; 				// set the port
// var database = require('./config/database'); 			// load the database config
var morgan = require('morgan');
var methodOverride = require('method-override');

// configuration ===============================================================
// mongoose.connect(process.env.DB_HOST_LOCAL); 	// Connect to local MongoDB instance. 
mongoose.connect(process.env.DB_HOST_REMOTE); 	// Connect to Azure remote CosmosDB instance. 

app.use(express.static('./public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(express.urlencoded()); // parse application/x-www-form-urlencoded
app.use(express.json()); // parse application/json
// app.use(express.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
